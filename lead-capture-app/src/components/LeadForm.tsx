import React, { useState } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
// Mantenemos los estilos base por seguridad, pero los sobreescribiremos abajo
import 'react-phone-number-input/style.css';

interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  budget: string;
}

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Tecnología y Software',
    budget: '$1,000 - $5,000',
  });

  const [country, setCountry] = useState<any>('VE');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // URL configurable por variable de entorno con fallback al webhook activo de Make
  const MAKE_WEBHOOK_URL = 
    import.meta.env.VITE_MAKE_WEBHOOK_URL || 
    'https://hook.us2.make.com/b6w8ce75jnfd6b3c1388eb2towlwpz6p';

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Por favor ingresa tu nombre completo.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo corporativo es obligatorio.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un formato de correo válido (ej. nombre@empresa.com).';
    }

    if (!formData.phone || formData.phone.trim().length < 6) {
      newErrors.phone = 'Por favor ingresa un número de teléfono válido.';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'El nombre de la empresa es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiamos el error del campo que el usuario está editando
    if (errors[name as keyof LeadData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Formateamos a E.164 legible con espacio para que Google Sheets lo guarde como texto puro sin necesidad de comillas en Make
    const formatPhoneE164 = (rawPhone: string, c: any) => {
      const dialCode = `+${c ? getCountryCallingCode(c) : '58'}`;
      let clean = rawPhone.trim();
      if (!clean.startsWith('+')) {
        return `${dialCode} ${clean.replace(/^0+/, '')}`;
      }
      const dialDigits = dialCode.replace('+', '');
      if (clean.startsWith(`+${dialDigits}`) && !clean.includes(' ')) {
        return `+${dialDigits} ${clean.slice(dialDigits.length + 1)}`;
      }
      return clean;
    };

    // Estructuramos el payload enriquecido con timestamp, país y teléfono normalizado
    const payload = {
      ...formData,
      phone: formatPhoneE164(formData.phone, country),
      country: country || 'VE',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ 
          fullName: '', 
          email: '', 
          phone: '', 
          company: '', 
          industry: 'Tecnología y Software', 
          budget: '$1,000 - $5,000' 
        });
        setErrors({});
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
      {/* CSS inyectado para lograr el diseño exacto de dos bloques separados estilo Stripe/Airbnb */}
      <style>{`
        /* Contenedor principal de react-phone-number-input */
        .custom-phone-input .PhoneInput {
          display: flex;
          align-items: stretch;
          gap: 0.5rem;
          width: 100%;
        }

        /* Bloque Izquierdo: Selector de País (Bandera + Código + Flecha) */
        .custom-phone-input .PhoneInputCountry {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 2.5rem; /* 40px - coincide con h-10 */
          padding: 0 0.75rem;
          background-color: #f9fafb; /* bg-gray-50 */
          border: 1px solid #d1d5db; /* border-gray-300 */
          border-radius: 0.375rem;   /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          cursor: pointer;
          margin-right: 0 !important; /* Anula el margin-right por defecto de la librería */
          user-select: none;
          flex-shrink: 0;
          transition: all 0.15s ease-in-out;
        }

        .custom-phone-input .PhoneInputCountry:hover {
          background-color: #f3f4f6; /* bg-gray-100 */
          border-color: #9ca3af;     /* border-gray-400 */
        }

        .custom-phone-input .PhoneInputCountry:focus-within {
          border-color: #3b82f6;     /* border-blue-500 */
          box-shadow: 0 0 0 1px #3b82f6;
          background-color: #ffffff;
        }

        /* Selector nativo invisible que cubre todo el bloque izquierdo */
        .custom-phone-input .PhoneInputCountrySelect {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 10;
          border: 0;
        }

        /* Bandera */
        .custom-phone-input .PhoneInputCountryIcon {
          width: 1.35rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.125rem;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          order: 1;
          flex-shrink: 0;
          margin: 0;
        }

        .custom-phone-input .PhoneInputCountryIcon--border {
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
        }

        .custom-phone-input .PhoneInputCountryIconImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Código de llamada dinámico inyectado en el bloque izquierdo */
        .custom-phone-input .PhoneInputCountry::after {
          content: var(--calling-code, "+58");
          font-size: 0.875rem; /* text-sm (14px) */
          font-weight: 500;    /* font-medium */
          color: #374151;      /* text-gray-700 */
          order: 2;
          white-space: nowrap;
          line-height: 1;
        }

        /* Flecha del dropdown */
        .custom-phone-input .PhoneInputCountrySelectArrow {
          width: 0.35rem;
          height: 0.35rem;
          border-style: solid;
          border-color: #6b7280; /* text-gray-500 */
          border-top-width: 0;
          border-left-width: 0;
          border-bottom-width: 1.5px;
          border-right-width: 1.5px;
          transform: rotate(45deg);
          margin-left: 0.125rem;
          margin-top: -2px;
          opacity: 0.7;
          order: 3;
          flex-shrink: 0;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .custom-phone-input .PhoneInputCountry:hover .PhoneInputCountrySelectArrow {
          opacity: 1;
          border-color: #374151;
        }

        /* Bloque Derecho: Input numérico del teléfono */
        .custom-phone-input .PhoneInputInput {
          flex: 1;
          min-width: 0;
          height: 2.5rem; /* 40px - coincide con h-10 */
          background-color: #ffffff;
          border: 1px solid #d1d5db; /* border-gray-300 */
          border-radius: 0.375rem;   /* rounded-md */
          padding: 0.5rem 0.75rem;   /* px-3 py-2 */
          font-size: 0.875rem;       /* text-sm */
          color: #111827;            /* text-gray-900 */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          outline: none;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .custom-phone-input .PhoneInputInput::placeholder {
          color: #9ca3af; /* text-gray-400 */
        }

        .custom-phone-input .PhoneInputInput:focus {
          border-color: #3b82f6; /* border-blue-500 */
          box-shadow: 0 0 0 1px #3b82f6;
        }

        /* Error state para el componente de teléfono */
        .custom-phone-input.phone-has-error .PhoneInputCountry,
        .custom-phone-input.phone-has-error .PhoneInputInput {
          border-color: #fca5a5; /* border-red-300 */
          background-color: rgba(254, 242, 242, 0.25);
        }
        .custom-phone-input.phone-has-error .PhoneInputCountry:focus-within,
        .custom-phone-input.phone-has-error .PhoneInputInput:focus {
          border-color: #ef4444; /* border-red-500 */
          box-shadow: 0 0 0 1px #ef4444;
        }
      `}</style>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Solicitar Asesoría B2B</h2>
      <p className="text-gray-500 mb-6 text-sm">Déjanos los datos de tu empresa y nuestro equipo te contactará en breve.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm transition-colors ${
              errors.fullName 
                ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-red-50/20' 
                : 'border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <span>⚠</span> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Corporativo *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej. juan@empresa.com"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm transition-colors ${
              errors.email 
                ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-red-50/20' 
                : 'border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <span>⚠</span> {errors.email}
            </p>
          )}
        </div>

        {/* CONTENEDOR DEL TELÉFONO PERSONALIZADO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Corporativo *</label>
          <div 
            className={`custom-phone-input ${errors.phone ? 'phone-has-error' : ''}`}
            style={{ 
              '--calling-code': `"+${country ? getCountryCallingCode(country) : '58'}"` 
            } as React.CSSProperties}
          >
            <PhoneInput
              international={false}
              defaultCountry="VE"
              country={country}
              onCountryChange={setCountry}
              value={formData.phone}
              onChange={(value) => {
                setFormData({ ...formData, phone: value || '' });
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="414 1234567"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <span>⚠</span> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Ej. Repuestos La Pastora CA"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm transition-colors ${
              errors.company 
                ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-red-50/20' 
                : 'border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <span>⚠</span> {errors.company}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector / Rubro</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            <option value="Agricultura y Ganadería">Agricultura y Ganadería</option>
            <option value="Banca y Finanzas">Banca y Finanzas</option>
            <option value="Comercio Mayorista / B2B">Comercio Mayorista / B2B</option>
            <option value="Comercio Minorista / Retail">Comercio Minorista / Retail</option>
            <option value="Construcción e Inmobiliaria">Construcción e Inmobiliaria</option>
            <option value="Educación">Educación</option>
            <option value="Logística y Transporte">Logística y Transporte</option>
            <option value="Manufactura e Industria">Manufactura e Industria</option>
            <option value="Salud y Farmacéutica">Salud y Farmacéutica</option>
            <option value="Servicios Automotrices">Servicios Automotrices</option>
            <option value="Tecnología y Software">Tecnología y Software</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto Estimado</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            <option value="Menos de $1,000">Menos de $1,000 (Proyecto Básico)</option>
            <option value="$1,000 - $5,000">$1,000 - $5,000 (Implementación Estándar)</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000 (Solución Avanzada)</option>
            <option value="Más de $10,000">Más de $10,000 (Arquitectura Enterprise)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white mt-6 transition-all duration-150 cursor-pointer ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-blue-500/20'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando a CRM...
            </>
          ) : (
            'Enviar Solicitud de Asesoría'
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-2 text-emerald-800 text-sm animate-fadeIn">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">¡Solicitud recibida con éxito!</p>
              <p className="text-xs text-emerald-700">Nuestro equipo ha recibido tus datos y te contactará en breve.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800 text-sm animate-fadeIn">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold">Hubo un problema al enviar.</p>
              <p className="text-xs text-red-700">Por favor verifica tu conexión o intenta nuevamente.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LeadForm;
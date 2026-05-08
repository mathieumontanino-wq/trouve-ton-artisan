// ============================================================
// components/ContactForm.jsx
// Formulaire de contact d'un artisan (POST /api/contact)
// ============================================================

import { useState } from 'react';
import { sendContactMessage } from '../services/api';

function ContactForm({ artisan }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState(null);

  // ----- Validation côté client -----
  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit faire au moins 2 caractères';
    } else if (formData.nom.length > 100) {
      newErrors.nom = 'Le nom ne doit pas dépasser 100 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.objet.trim()) {
      newErrors.objet = "L'objet est requis";
    } else if (formData.objet.trim().length < 3) {
      newErrors.objet = "L'objet doit faire au moins 3 caractères";
    } else if (formData.objet.length > 200) {
      newErrors.objet = "L'objet ne doit pas dépasser 200 caractères";
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit faire au moins 10 caractères';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Le message ne doit pas dépasser 2000 caractères';
    }

    return newErrors;
  };

  // ----- Mise à jour des inputs -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Efface l'erreur du champ dès que l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ----- Soumission -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setServerError(null);

    try {
      await sendContactMessage({
        artisanId: artisan.id_artisan,
        nom: formData.nom,
        email: formData.email,
        objet: formData.objet,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ nom: '', email: '', objet: '', message: '' });
    } catch (err) {
      console.error('Erreur envoi message :', err);
      setStatus('error');
      setServerError(
        err.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <h2 className="contact-form__title">
          Contacter {artisan.nom}
        </h2>

        {status === 'success' && (
          <div className="contact-form__success" role="status">
            ✓ Votre message a été envoyé avec succès. {artisan.nom} vous
            répondra sous 48h.
          </div>
        )}

        {status === 'error' && serverError && (
          <div className="contact-form__error" role="alert">
            ✗ {serverError}
          </div>
        )}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Nom */}
          <div className="contact-form__group">
            <label htmlFor="nom" className="contact-form__label">
              Nom <span className="contact-form__required" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`contact-form__input ${errors.nom ? 'is-invalid' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.nom}
              aria-describedby={errors.nom ? 'nom-error' : undefined}
              maxLength={100}
            />
            {errors.nom && (
              <p id="nom-error" className="contact-form__error-msg" role="alert">
                {errors.nom}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="contact-form__group">
            <label htmlFor="email" className="contact-form__label">
              Email <span className="contact-form__required" aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`contact-form__input ${errors.email ? 'is-invalid' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="contact-form__error-msg" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Objet */}
          <div className="contact-form__group">
            <label htmlFor="objet" className="contact-form__label">
              Objet <span className="contact-form__required" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              value={formData.objet}
              onChange={handleChange}
              className={`contact-form__input ${errors.objet ? 'is-invalid' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.objet}
              aria-describedby={errors.objet ? 'objet-error' : undefined}
              maxLength={200}
            />
            {errors.objet && (
              <p id="objet-error" className="contact-form__error-msg" role="alert">
                {errors.objet}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="contact-form__group">
            <label htmlFor="message" className="contact-form__label">
              Message <span className="contact-form__required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`contact-form__textarea ${errors.message ? 'is-invalid' : ''}`}
              rows="6"
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : 'message-counter'}
              maxLength={2000}
            />
            <p id="message-counter" className="contact-form__counter">
              {formData.message.length} / 2000 caractères
            </p>
            {errors.message && (
              <p id="message-error" className="contact-form__error-msg" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Bouton envoyer */}
          <button
            type="submit"
            className="contact-form__submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
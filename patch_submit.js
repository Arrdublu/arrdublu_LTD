const fs = require('fs');
let content = fs.readFileSync('src/app/page-client.tsx', 'utf8');

const regex = /const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\}, 4500\)\n  \}/;

const newFunction = `const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return;

    const result = contactSchema.safeParse(formInput)
    if (!result.success) {
      const formatted = result.error.format()
      setFormErrors({
        name: formatted.name?._errors[0],
        email: formatted.email?._errors[0],
        message: formatted.message?._errors[0]
      })
      return
    }

    setFormErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formInput.name,
          email: formInput.email,
          message: formInput.message,
          serviceName: 'General Inquiry (Home Page)',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormInput({ name: '', email: '', message: '' })
      }, 4500)
    } catch (err) {
      console.error(err);
      setFormErrors(prev => ({ ...prev, submit: 'Failed to send your inquiry. Please try again later.' }));
    } finally {
      setIsSubmitting(false)
    }
  }`;

content = content.replace(regex, newFunction);
fs.writeFileSync('src/app/page-client.tsx', content);

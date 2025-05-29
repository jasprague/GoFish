'use client';
import { useState } from 'react';
import styles from './HomeBanner.module.scss';
import Button from '@/components/button/Button';


export default function HomeBanner() {
    const isInBeta = true;

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess(false);
  
      // Client-side validation
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        setError('Name and email are required.');
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      setLoading(true);
  
      try {
        const response = await fetch('/api/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSuccess(true);
          setFormData({ firstName: '', lastName: '', email: '' }); // Reset form
        } else {
          const data = await response.json();
          setError(data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };


    return(
        <div className={styles.HomeBanner}>
            <h1><span className={styles.headingTitle}>Go Fish</span>, Bud.</h1>
            <h3 className="pb-5">The online job board for the fishing industry.</h3>
            <p>Fill out the form below to be updated when our app is live!</p>
            {!isInBeta &&
                <div className="flex gap-10 flex-wrap justify-start">
                <Button text="Find a Job" link="/sign-up" variant="default" />
                <Button text="Search For Help" link="/help-out" variant="alt" />
                </div>
            }
            {isInBeta &&
  <div className="flex w-full flex-wrap justify-start">
        <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <label htmlFor="firstName" className="sr-only">
              Enter Your First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              placeholder="First Name"
              className={styles.halfInput + ' p-5 rounded-md'}
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label htmlFor="last-name" className="sr-only">
              Enter Your First Name
            </label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              placeholder="Last Name"
              className={styles.halfInput + ' p-5 rounded-md'}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="email" className="sr-only">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="p-5 rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="p-5 bg-[#E98F35] button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Send It'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Message received -  We&apos;ll email you when we are up and running. Thanks!</p>}
      </div>
            }
        </div>
    )
}
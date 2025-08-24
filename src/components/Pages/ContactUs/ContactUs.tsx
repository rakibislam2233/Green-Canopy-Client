"use client";
import locateImage from "@/assets/locate/locate.png";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useContactToAdminMutation } from "@/redux/features/contact/contactApi";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import { toast } from "sonner";
import { useJoinNewsLetterMutation } from "@/redux/features/newsletter/newsLetterApi";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface IFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactUs = () => {
  const [form] = Form.useForm();
  const [createContact, { isLoading }] = useContactToAdminMutation();
  const [joinNewsLetter] = useJoinNewsLetterMutation();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const handleContact = async (values: IFormValues) => {
    if (!captchaVerified) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    try {
      await createContact(values).unwrap();
      toast.success("Message sent successfully");
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleNewsLetterSubscribe = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    if (!email) return;

    try {
      const res = await joinNewsLetter({ email }).unwrap();
      toast.success(res.message);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="PrivacyPolicy"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="w-full md:container mx-auto px-5 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">Get in touch for expert advice</p>
              <a
                href="mailto:horticulturespecialists@gmail.com"
                className="block mt-3 text-white/90 hover:text-white transition-colors duration-300 underline"
              >
                info@greencanopy.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="opacity-90">Serving Central New Jersey</p>
              <p className="mt-3 text-white/90">
                Professional horticulture services in your area
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
              <p className="opacity-90">We&apos;re here when you need us</p>
              <div className="mt-3 text-white/90 text-sm">
                <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Let&apos;s Grow Together
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to transform your landscape? Send us a message and our
                experts will get back to you within 24 hours.
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleContact}
                className="space-y-6"
              >
                <div className="w-full flex flex-col md:flex-row gap-4">
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <InputComponent placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <InputComponent placeholder="Email" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    //add only numaric value
                    {
                      pattern: /^[0-9]+$/,
                      message: "Please enter a valid phone number",
                    },
                  ]}
                >
                  <InputComponent placeholder="Phone Number" type="tel" />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}
                >
                  <InputComponent
                    placeholder="Message"
                    isTextArea={true}
                    rows={5}
                  />
                </Form.Item>
                <button
                  disabled={!captchaVerified}
                  type="submit"
                  className={`w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg ${
                    !captchaVerified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Send Message 🚀
                </button>
              </Form>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Subscription Section */}
      <div className="w-full bg-primary py-10">
        <div className="w-full md:container py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 text-white">
            <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              Subscribe Now!!
            </h3>
            <p className="text-sm md:text-base">
              Get the latest updates, news, and special offers from our company.
            </p>
          </div>
          <form
            onSubmit={handleNewsLetterSubscribe}
            className="flex w-full md:w-auto items-center bg-white rounded-lg"
          >
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              className="px-4 py-3 w-full outline-none rounded-l-lg"
            />
            <button className="px-4 py-3 bg-secondary text-white rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

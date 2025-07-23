// Page VENDEZ VOS BIJOUX pour ALMAS & MIDAS
// Page de vente de bijoux avec processus en 3 étapes

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Eye, 
  DollarSign, 
  Shield, 
  Award, 
  Star,
  CheckCircle,
  Camera,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VendezVosBijouxPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Téléchargez une photo",
      description: "Notre outil EVA IA identifie rapidement les caractéristiques de vos bijoux.",
      icon: Upload,
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "02", 
      title: "Recevez votre estimation",
      description: "Valeur précise grâce à des millions de données. Instantanée & impartiale.",
      icon: Eye,
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "03",
      title: "Confiez-nous la vente",
      description: "Nous nous occupons de tout, vous êtes payé dès que c'est vendu !",
      icon: DollarSign,
      color: "from-pink-500 to-red-600"
    }
  ];

  const advantages = [
    {
      title: "Meilleur prix du marché",
      description: "Bénéficiez du prix optimal, déterminé par l'analyse de plus d'un million de bijoux.",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Assurance complète",
      description: "Expédiez sereinement, vos bijoux sont assurés contre leur perte ou les dommages.",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Commission transparente",
      description: "Profitez d'une commission unique de 35% — sans frais cachés, sans surprise.",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Pauline T.",
      text: "Ce qui m'a le plus séduite, c'est leur nouvel outil d'estimation. Avant, j'étais souvent perdue face aux propositions des vendeurs de bijoux dans la rue, ne sachant pas si les prix proposés étaient justes ou non. Avec cet outil, je sais exactement la valeur de mes bijoux.",
      rating: 5
    },
    {
      name: "Claire R.",
      text: "Grâce à ALMAS & MIDAS, je n'ai plus peur d'être trompée par des estimations bas de gamme. Je prévois déjà de leur confier d'autres pièces, car je sais qu'elles seront entre de bonnes mains.",
      rating: 5
    },
    {
      name: "Pauline R.",
      text: "Le service client est simplement TOP. L'équipe est à l'écoute, réactive et se surpasse pour s'assurer que chaque transaction se déroule sans encombre.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Quel service proposez-vous ?",
      answer: "Nous offrons un service de dépôt-vente, permettant de vendre vos bijoux au meilleur prix. Le paiement s'effectue après la vente du bijou."
    },
    {
      question: "Quelle est la commission ?",
      answer: "Notre commission est de 35% du prix de vente final. Cette commission couvre tous les frais : expertise, photographie professionnelle, marketing, assurance et transaction sécurisée."
    },
    {
      question: "Que se passe-t-il après l'acceptation de l'estimation ?",
      answer: "Une fois l'estimation acceptée, vous nous envoyez votre bijou par transporteur assuré. Nous le photographions professionnellement et le mettons en vente sur notre plateforme."
    },
    {
      question: "Y a-t-il un contrat ?",
      answer: "Oui, nous établissons un contrat de dépôt-vente qui protège vos intérêts et définit clairement les conditions de la vente."
    },
    {
      question: "Quels modes de paiement proposez-vous ?",
      answer: "Le paiement s'effectue par virement bancaire dans les 48h suivant la vente de votre bijou."
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="ml-2 text-gray-600">4.7/5.0 — 1400+ avis</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              La Vente de vos Bijoux
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Simplifiée
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Vendez vos bijoux auprès de notre communauté de plus d'un million de passionnés.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Vendez Maintenant
              </Button>
            </motion.div>
            
            <p className="text-sm text-gray-500 mt-4">
              Estimation Instantanée grâce à l'IA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une vente facile en 3 étapes
            </h2>
            <p className="text-xl text-gray-600">
              Processus simple et sécurisé pour vendre vos bijoux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-400 mb-2">ÉTAPE {step.number}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Commencez votre estimation
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Téléchargez une photo de votre bijou
                  </p>
                  <p className="text-gray-500">
                    Formats acceptés: JPG, PNG (max 10MB)
                  </p>
                </label>
              </div>
              
              {selectedFile && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">
                    Photo téléchargée: {selectedFile.name}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vendez en toute sécurité
            </h2>
            <p className="text-xl text-gray-600">
              ALMAS & MIDAS vs Autres solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 mx-auto`}>
                  <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils ont aimé notre service
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Les questions les plus posées
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Vous êtes à Paris ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Prenez rendez-vous avec nos experts.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+33 (0)1 42 60 50 35</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>contact@almas-midas.fr</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Paris, France</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Prenez rendez-vous
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VendezVosBijouxPage;


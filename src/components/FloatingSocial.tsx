'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

export default function FloatingSocial() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/380980050505"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5A] transition-colors shadow-lg"
        style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.a>

      {/* Telegram */}
      <motion.a
        href="https://t.me/ProRepairBot"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 flex items-center justify-center bg-[#0088cc] hover:bg-[#0077B5] transition-colors shadow-lg"
        style={{ boxShadow: '0 4px 20px rgba(0,136,204,0.3)' }}
        aria-label="Telegram"
      >
        <Send className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
}
"use client";

import RegisterModal from "@/components/modals/RegisterModal";
import { useState } from "react";

const RegisterPage = () => {
  const [isOpen, setIsOpen] = useState(true); // init with true

  return <RegisterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default RegisterPage;

"use client";

import LoginModal from "@/components/modals/LoginModal";
import { useState } from "react";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true); // init with true

  return <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default LoginPage;

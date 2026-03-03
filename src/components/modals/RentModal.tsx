"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { categories } from "../navbar/categories";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
  IMAGE = 2,
  GUESTS = 3,
}

const RentModal: React.FC<RentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [guests, setGuests] = useState(1);

  const onNext = () => {
    if (step !== STEPS.GUESTS) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const onBack = () => {
    if (step !== STEPS.CATEGORY) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const data = {
      category,
      description,
      image,
      guests,
    };

    console.log("Listing Created:", data);
    onClose();
  };

  let bodyContent;

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="grid grid-cols-2 gap-4">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center gap-2 ${
                category === item.value ? "border-black" : "border-gray-200"
              }`}
            >
              <Icon size={30} />
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <textarea
        placeholder="Describe your place..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />
    );
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <input
        type="text"
        placeholder="Paste image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />
    );
  }

  if (step === STEPS.GUESTS) {
    bodyContent = (
      <input
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="w-full border p-3 rounded-lg"
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader className="text-lg font-semibold text-center">
          <DialogTitle>Be a Rentiva Host</DialogTitle>
        </DialogHeader>

        <div className="py-6">{bodyContent}</div>

        <DialogFooter className="flex justify-between">
          {step !== STEPS.CATEGORY && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}

          <Button onClick={onNext}>
            {step === STEPS.GUESTS ? "Create Listing" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;

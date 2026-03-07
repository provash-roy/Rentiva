"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { categories } from "../categories/categories";
import axios from "axios";
import toast from "react-hot-toast";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  CATEGORY = 0,
  DETAILS = 1,
  IMAGE = 2,
  GUESTS = 3,
}

const RentModal: React.FC<RentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [image, setImage] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post("/api/listings", {
        category,
        title,
        description,
        pricePerNight,
        images: [image],
        maxGuests,
      });

      toast.success("Your listing has been created 🎉");

      setCategory("");
      setTitle("");
      setDescription("");
      setPricePerNight(0);
      setImage("");
      setMaxGuests(1);
      setStep(STEPS.CATEGORY);
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  let bodyContent;

  // STEP 1: CATEGORY
  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={`flex flex-col items-center justify-center cursor-pointer p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                category === item.value
                  ? "border-black bg-gray-100"
                  : "border-gray-200"
              }`}
              style={{ height: 80 }}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 text-center">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // STEP 2: DETAILS
  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Beautiful apartment in city center"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your place..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24 resize-none"
          />
        </div>

        <div>
          <Label htmlFor="pricePerNight">Price per Night ($)</Label>
          <Input
            type="number"
            id="pricePerNight"
            placeholder="100"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(Number(e.target.value))}
          />
        </div>
      </div>
    );
  }

  // STEP 3: IMAGE
  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="text"
          placeholder="https://example.com/photo.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
    );
  }

  // STEP 4: GUESTS
  if (step === STEPS.GUESTS) {
    bodyContent = (
      <div>
        <Label htmlFor="maxGuests">Maximum Guests</Label>
        <Input
          id="maxGuests"
          type="number"
          min={1}
          value={maxGuests}
          onChange={(e) => setMaxGuests(Number(e.target.value))}
        />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader className="text-lg font-semibold text-center">
          <DialogTitle>Be a Rentiva Host</DialogTitle>
        </DialogHeader>

        <div className="py-6">{bodyContent}</div>

        <DialogFooter className="flex justify-between">
          {step !== STEPS.CATEGORY && (
            <Button variant="outline" onClick={onBack} disabled={loading}>
              Back
            </Button>
          )}

          <Button onClick={onNext} disabled={loading}>
            {step === STEPS.GUESTS
              ? loading
                ? "Creating..."
                : "Create Listing"
              : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;

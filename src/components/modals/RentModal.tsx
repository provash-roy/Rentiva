"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import countries from "world-countries";

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

import { categories } from "../categories/data";

import axios from "axios";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  DETAILS = 2,
  IMAGE = 3,
  GUESTS = 4,
}

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface CountryOption {
  value: string;
  label: string;
  countryData: any;
}

const RentModal: React.FC<RentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);
  const [popupText, setPopupText] = useState("London");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [image, setImage] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const options: CountryOption[] = countries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
    countryData: country,
  }));

  const handleCountryChange = (option: CountryOption | null) => {
    setSelectedCountry(option);

    if (option?.countryData?.latlng) {
      const [lat, lng] = option.countryData.latlng;
      setMapPosition([lat, lng]);
      setPopupText(option.countryData.name.common);
    }
  };

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
        country: selectedCountry?.label,
        location: mapPosition,
        title,
        description,
        pricePerNight,
        images: [image],
        maxGuests,
      });

      toast.success("Your listing has been created 🎉");

      // Reset form
      setCategory("");
      setSelectedCountry(null);
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
              className={`flex flex-col items-center justify-center cursor-pointer p-3 rounded-lg border transition hover:scale-105 ${
                category === item.value
                  ? "border-black bg-gray-100"
                  : "border-gray-200"
              }`}
              style={{ height: 80 }}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // STEP 2: LOCATION
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">
            Where is your place located?
          </h2>
          <p className="text-sm text-gray-500">
            Select a country to display it on the map
          </p>
        </div>

        <div className="space-y-2">
          <Label>Select Country</Label>
          <Select
            options={options}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Search country..."
            isClearable
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            }
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>

        <div className="rounded-xl overflow-hidden border shadow-sm">
          <Map position={mapPosition} zoom={4} popupText={popupText} />
        </div>
      </div>
    );
  }

  // STEP 3: DETAILS
  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Beautiful apartment in city center"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24 resize-none"
          />
        </div>

        <div>
          <Label>Price per Night ($)</Label>
          <Input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(Number(e.target.value))}
          />
        </div>
      </div>
    );
  }

  // STEP 4: IMAGE
  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div>
        <Label>Image URL</Label>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>
    );
  }

  // STEP 5: GUESTS
  if (step === STEPS.GUESTS) {
    bodyContent = (
      <div>
        <Label>Maximum Guests</Label>
        <Input
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
      <DialogContent className="max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
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

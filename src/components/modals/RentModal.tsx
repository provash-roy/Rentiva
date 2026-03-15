"use client";

import { useState } from "react";
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
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";

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
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);

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
      // setPopupText(option.countryData.name.common);
    }
  };

  const onNext = () => {
    setStep((prev) => (prev < STEPS.GUESTS ? prev + 1 : prev));
  };

  const onBack = () => {
    setStep((prev) => (prev > STEPS.CATEGORY ? prev - 1 : prev));
  };

  const handleSubmit = async () => {
    if (
      !category ||
      !selectedCountry ||
      !city ||
      !address ||
      !title ||
      !description ||
      !pricePerNight ||
      !image ||
      !maxGuests
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/listings", {
        category,
        country: selectedCountry.label,
        city,
        address,
        location: mapPosition,
        title,
        description,
        pricePerNight,
        images: [image],
        maxGuests,
      });

      toast.success("Your listing has been created 🎉");

      // Reset all
      setCategory("");
      setSelectedCountry(null);
      setCity("");
      setAddress("");
      setMapPosition([51.505, -0.09]);

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
        <h2 className="text-lg font-semibold">Where is your place located?</h2>

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
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Input
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Street Address</Label>
          <Input
            placeholder="Enter street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
    );
  }
  // STEP 3: DETAILS
  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            placeholder="Beautiful apartment in city center"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            className="h-24 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Price per Night ($)</Label>
          <Input
            type="text"
            placeholder="Enter price per night"
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
      <div className="flex flex-col gap-4">
        <label className="font-medium text-gray-700">Upload Image</label>

        <CldUploadWidget
          uploadPreset="rentiva_upload"
          onSuccess={(result) => {
            if (result.info?.secure_url) {
              setImage(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Upload size={20} /> {/* Lucide Upload Icon */}
              Upload Image
            </button>
          )}
        </CldUploadWidget>

        {/* Image Preview */}
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Uploaded"
              className="w-full max-w-xs h-auto rounded shadow"
            />
          </div>
        )}
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

          <Button
            onClick={step === STEPS.GUESTS ? handleSubmit : onNext}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
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

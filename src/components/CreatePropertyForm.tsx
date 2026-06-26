"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const POPULAR_EQUIPMENTS = [
  "Micro-Ondes", "Douche italienne", "Frigo", "WIFI", "Parking",
  "Sèche Cheveux", "Machine à laver", "Cuisine équipée", "Télévision",
  "Chambre Séparée", "Climatisation", "Frigo Américain", "Clic-clac",
  "Four", "Rangements", "Lit", "Bouilloire", "SDB", "Toilettes sèches",
  "Cintres", "Baie vitrée", "Hotte", "Baignoire", "Vue Parc"
];

const INITIAL_CATEGORIES = [
  "Parc", "Night Life", "Culture", "Nature", "Touristique",
  "Vue sur mer", "Pour les couples", "Famille", "Forêt"
];

export default function CreatePropertyForm() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [pricePerNight, setPricePerNight] = useState(80);
  const [cover, setCover] = useState("");
  const [pictures, setPictures] = useState<string[]>([""]);
  const [hostName, setHostName] = useState("");
  const [hostPicture, setHostPicture] = useState("");

  // Categories & Equipments states
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  // UI Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload progress states
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPictures, setUploadingPictures] = useState<boolean[]>([false]);
  const [uploadingHostPicture, setUploadingHostPicture] = useState(false);

  // Hidden file inputs refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const hostPicInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Prefill host information with logged-in user profile
  useEffect(() => {
    if (user) {
      setHostName(user.name || "");
      setHostPicture(user.picture || "");
    }
  }, [user]);

  // Upload helper
  const handleUpload = async (
    file: File,
    purpose: "property-cover" | "property-picture" | "user-picture"
  ): Promise<string> => {
    if (!token) {
      throw new Error("Vous devez être connecté pour uploader une image.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);

    const res = await fetch("/api/uploads/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Erreur lors de l'upload de l'image.");
    }

    const data = await res.json();
    return data.url;
  };

  // Cover image upload
  const triggerCoverUpload = () => coverInputRef.current?.click();
  const onCoverFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setError(null);
    try {
      const url = await handleUpload(file, "property-cover");
      setCover(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'upload de la couverture.");
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  // Host profile picture upload
  const triggerHostPicUpload = () => hostPicInputRef.current?.click();
  const onHostPicFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHostPicture(true);
    setError(null);
    try {
      const url = await handleUpload(file, "user-picture");
      setHostPicture(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'upload de l'avatar.");
    } finally {
      setUploadingHostPicture(false);
      if (hostPicInputRef.current) hostPicInputRef.current.value = "";
    }
  };

  // Housing gallery pictures upload
  const triggerPictureUpload = (index: number) => {
    pictureInputRefs.current[index]?.click();
  };
  const onPictureFileChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUploading = [...uploadingPictures];
    newUploading[index] = true;
    setUploadingPictures(newUploading);
    setError(null);

    try {
      const url = await handleUpload(file, "property-picture");
      const newPics = [...pictures];
      newPics[index] = url;
      setPictures(newPics);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'upload de l'image.");
    } finally {
      const resetUploading = [...uploadingPictures];
      resetUploading[index] = false;
      setUploadingPictures(resetUploading);
      if (pictureInputRefs.current[index]) {
        pictureInputRefs.current[index]!.value = "";
      }
    }
  };

  const handleAddPictureRow = () => {
    setPictures([...pictures, ""]);
    setUploadingPictures([...uploadingPictures, false]);
  };

  const handleRemovePictureRow = (index: number) => {
    if (pictures.length <= 1) {
      const newPics = [...pictures];
      newPics[0] = "";
      setPictures(newPics);
      return;
    }
    const newPics = pictures.filter((_, i) => i !== index);
    const newUploading = uploadingPictures.filter((_, i) => i !== index);
    setPictures(newPics);
    setUploadingPictures(newUploading);
  };

  const handlePictureChange = (val: string, index: number) => {
    const newPics = [...pictures];
    newPics[index] = val;
    setPictures(newPics);
  };

  // Equipments toggles
  const handleEquipmentToggle = (name: string) => {
    if (selectedEquipments.includes(name)) {
      setSelectedEquipments(selectedEquipments.filter((item) => item !== name));
    } else {
      setSelectedEquipments([...selectedEquipments, name]);
    }
  };

  // Categories toggles
  const handleTagToggle = (name: string) => {
    if (selectedTags.includes(name)) {
      setSelectedTags(selectedTags.filter((t) => t !== name));
    } else {
      setSelectedTags([...selectedTags, name]);
    }
  };

  // Add custom tags
  const handleAddCustomTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const tag = newTagInput.trim();
    if (!tag) return;

    if (!customTags.includes(tag) && !INITIAL_CATEGORIES.includes(tag)) {
      setCustomTags([...customTags, tag]);
    }
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setNewTagInput("");
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Le titre de la propriété est obligatoire.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formattedLocation = postalCode.trim()
      ? `${city.trim() || "Paris"} (${postalCode.trim()})`
      : (city.trim() || "Paris, France");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      cover: cover.trim() || undefined,
      location: formattedLocation,
      price_per_night: pricePerNight || 80,
      host: hostName.trim() ? {
        name: hostName.trim(),
        picture: hostPicture.trim() || undefined
      } : undefined,
      pictures: pictures.filter(url => url.trim() !== ""),
      equipments: selectedEquipments,
      tags: selectedTags
    };

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Une erreur est survenue lors de la création de la propriété.");
      }

      const createdProperty = await res.json();
      router.push(`/properties/${createdProperty.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion avec le serveur.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SVG Plus Icon
  const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-[40px] items-center relative pb-12">
      {/* Top action row */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-[16px] py-[8px] bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#565656] text-[14px] font-medium rounded-[10px] transition-colors w-fit cursor-pointer font-sans"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-3.5 h-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Retour
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[24px] font-medium text-[#0d0d0d] font-sans">
          Ajouter une propriété
        </h1>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#99331a] hover:bg-[#802a15] text-white font-medium text-[14px] px-[32px] py-[8px] rounded-[10px] cursor-pointer transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans w-full md:w-auto h-[40px] flex items-center justify-center"
        >
          {isSubmitting ? "Ajout..." : "Ajouter"}
        </button>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div
          role="alert"
          className="w-full p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-[10px] text-center font-sans"
        >
          {error}
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={coverInputRef}
        accept="image/*"
        onChange={onCoverFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={hostPicInputRef}
        accept="image/*"
        onChange={onHostPicFileChange}
        className="hidden"
      />

      {/* Main Grid: Forms and inputs */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-[16px] items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-[16px]">
          {/* Card 1: Main details */}
          <div className="bg-white border border-[#f5f5f5] rounded-[10px] p-6 md:p-[80px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-4 md:gap-[16px]">
            {/* Title input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="title" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Titre de la propriété
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Appartement cosy au coeur de paris"
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656] focus:outline-none focus:border-[#99331a] transition-all font-sans"
                required
              />
            </div>

            {/* Description input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="description" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre propriété en détail..."
                rows={4}
                className="w-full border border-[#f5f5f5] bg-white rounded-[4px] p-[10px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656] focus:outline-none focus:border-[#99331a] transition-all font-sans resize-none h-[115px]"
              />
            </div>

            {/* Price Per Night input (Optional, defaults to 80) */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="pricePerNight" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Prix par nuit (€)
              </label>
              <input
                id="pricePerNight"
                type="number"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                placeholder="Ex: 80"
                min={1}
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656] focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
            </div>

            {/* Postal Code input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="postalCode" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Code postal
              </label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Ex: 75017"
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
            </div>

            {/* Location/City input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="city" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Localisation
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Paris"
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
            </div>
          </div>

          {/* Card 2: Equipments */}
          <div className="bg-white border border-[#f5f5f5] rounded-[10px] p-6 md:p-[80px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-4 md:gap-[16px]">
            <h2 className="text-[14px] font-medium text-[#0d0d0d] font-sans">
              Équipements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-2 w-full">
              {POPULAR_EQUIPMENTS.map((eq) => {
                const isChecked = selectedEquipments.includes(eq);
                return (
                  <label
                    key={eq}
                    className="flex items-center gap-2 px-[10px] py-[4px] hover:bg-slate-50 rounded cursor-pointer select-none text-[12px] text-[#565656] font-sans transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleEquipmentToggle(eq)}
                      className="rounded-[2px] border border-[#565656] size-[12px] accent-[#99331a] focus:ring-0 cursor-pointer"
                    />
                    <span>{eq}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 md:gap-[16px]">
          {/* Card 3: Images */}
          <div className="bg-white border border-[#f5f5f5] rounded-[10px] px-6 py-8 md:px-[80px] md:py-[48px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-6 md:gap-[16px]">
            {/* Cover image input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="cover" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Image de couverture
              </label>
              <div className="flex gap-[8px] items-center w-full">
                <input
                  id="cover"
                  type="text"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="URL de l'image de couverture"
                  className="flex-1 h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={triggerCoverUpload}
                  disabled={uploadingCover}
                  className="bg-[#99331a] hover:bg-[#802a15] text-white flex items-center justify-center rounded-[5px] shrink-0 size-[37px] cursor-pointer transition-colors"
                  aria-label="Uploader l'image de couverture"
                >
                  {uploadingCover ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PlusIcon />
                  )}
                </button>
              </div>
              {cover && (
                <div className="mt-2 relative w-full h-[120px] rounded-[5px] overflow-hidden border border-[#f5f5f5]">
                  <img
                    src={cover}
                    alt="Aperçu couverture"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => setCover("")}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer transition-colors shadow"
                    aria-label="Supprimer l'image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Housing gallery pictures inputs */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Image du logement
              </label>

              {pictures.map((pic, idx) => (
                <div key={idx} className="flex flex-col gap-1 w-full mb-1">
                  <div className="flex gap-[8px] items-center w-full">
                    <input
                      type="text"
                      value={pic}
                      onChange={(e) => handlePictureChange(e.target.value, idx)}
                      placeholder="URL de l'image de la galerie"
                      className="flex-1 h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
                    />
                    <input
                      type="file"
                      ref={(el) => {
                        pictureInputRefs.current[idx] = el;
                      }}
                      accept="image/*"
                      onChange={(e) => onPictureFileChange(e, idx)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => triggerPictureUpload(idx)}
                      disabled={uploadingPictures[idx]}
                      className="bg-[#99331a] hover:bg-[#802a15] text-white flex items-center justify-center rounded-[5px] shrink-0 size-[37px] cursor-pointer transition-colors"
                      aria-label={`Uploader l'image ${idx + 1}`}
                    >
                      {uploadingPictures[idx] ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <PlusIcon />
                      )}
                    </button>
                    {pictures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePictureRow(idx)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-[5px] flex items-center justify-center shrink-0 size-[37px] cursor-pointer transition-colors border border-gray-200"
                        aria-label={`Supprimer l'image ${idx + 1}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {pic && (
                    <div className="mt-1 relative w-full h-[80px] rounded-[5px] overflow-hidden border border-[#f5f5f5]">
                      <img
                        src={pic}
                        alt={`Aperçu galerie ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddPictureRow}
                className="text-[14px] font-normal text-[#99331a] hover:underline cursor-pointer text-left w-fit font-sans mt-1"
              >
                +Ajouter une image
              </button>
            </div>
          </div>

          {/* Card 4: Host Details */}
          <div className="bg-white border border-[#f5f5f5] rounded-[10px] px-6 py-8 md:px-[80px] md:py-[48px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-4 md:gap-[16px]">
            {/* Host Name input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="hostName" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Nom de l’hôte
              </label>
              <input
                id="hostName"
                type="text"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="Ex: John Doe"
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
            </div>

            {/* Host Picture input */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="hostPicture" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Photo de profil
              </label>
              <div className="flex gap-[8px] items-center w-full">
                <input
                  id="hostPicture"
                  type="text"
                  value={hostPicture}
                  onChange={(e) => setHostPicture(e.target.value)}
                  placeholder="URL de la photo de profil de l'hôte"
                  className="flex-1 h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={triggerHostPicUpload}
                  disabled={uploadingHostPicture}
                  className="bg-[#99331a] hover:bg-[#802a15] text-white flex items-center justify-center rounded-[5px] shrink-0 size-[37px] cursor-pointer transition-colors"
                  aria-label="Uploader la photo de profil"
                >
                  {uploadingHostPicture ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PlusIcon />
                  )}
                </button>
              </div>
              {hostPicture && (
                <div className="mt-2 flex items-center gap-3 p-2 bg-[#f5f5f5]/30 border border-[#f5f5f5] rounded-[5px]">
                  <img
                    src={hostPicture}
                    alt="Aperçu Hôte"
                    className="object-cover w-10 h-10 rounded-full border border-white shadow-sm"
                  />
                  <span className="text-xs text-[#565656] truncate flex-1">{hostPicture}</span>
                  <button
                    type="button"
                    onClick={() => setHostPicture("")}
                    className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card 5: Categories */}
          <div className="bg-white border border-[#f5f5f5] rounded-[10px] p-6 md:p-[80px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-4 md:gap-[16px]">
            <h2 className="text-[14px] font-medium text-[#0d0d0d] font-sans">
              Catégories
            </h2>

            {/* Tags wrapper */}
            <div className="flex flex-wrap gap-2 w-full">
              {[...INITIAL_CATEGORIES, ...customTags].map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-[16px] py-[8px] text-[12px] font-normal rounded-[5px] transition-all border duration-200 cursor-pointer font-sans ${
                      isSelected
                        ? "bg-[#99331a] text-white border-[#99331a] shadow-sm"
                        : "bg-[#f5f5f5] text-[#565656] border-[#f5f5f5] hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Custom Category Tag input */}
            <div className="flex flex-col gap-1 w-full mt-2">
              <label htmlFor="newTag" className="text-[14px] font-medium text-[#0d0d0d] font-sans">
                Ajouter une catégorie personnalisée
              </label>
              <div className="flex gap-[8px] items-center w-full">
                <input
                  id="newTag"
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomTag();
                    }
                  }}
                  placeholder="Nouveau tag"
                  className="flex-1 h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[10px] py-[16px] text-[12px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => handleAddCustomTag()}
                  className="bg-[#99331a] hover:bg-[#802a15] text-white flex items-center justify-center rounded-[5px] shrink-0 size-[37px] cursor-pointer transition-colors"
                  aria-label="Ajouter la catégorie personnalisée"
                >
                  <PlusIcon />
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleAddCustomTag()}
                className="text-[14px] font-normal text-[#99331a] hover:underline cursor-pointer text-left w-fit font-sans mt-1"
              >
                +Ajouter un tag
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

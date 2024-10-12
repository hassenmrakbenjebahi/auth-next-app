"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SignInWithGoogle from "./SigninWithGoogle";
import SignOut from "./SignOut";
import Swal from "sweetalert2";

// Schéma de validation avec Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  address: Yup.string().required("Address is required"),
  birthdate: Yup.date().required("Date of birth is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .required("Phone number is required"),
});

export default function Profile() {
  const { data, status } = useSession();
  const [addressError, setAddressError] = useState("");

  //Paris
  const parisCoords = { latitude: 48.8566, longitude: 2.3522 };

  // Fonction pour calculer la distance entre deux points (en km)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Fonction for adress
  const validateAddress = async (address: string) => {
    try {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${address}`
      );
      const features = response.data.features;
      if (features.length === 0) {
        setAddressError("Address not found");
        return false;
      }
      const { geometry } = features[0];
      const [longitude, latitude] = geometry.coordinates;
      const distanceFromParis = calculateDistance(parisCoords.latitude, parisCoords.longitude, latitude, longitude);

      if (distanceFromParis > 50) {
        setAddressError("Address must be within 50 km of Paris");
        return false;
      }
      setAddressError(""); // Clear error if validation passes
      return true;
    } catch (error) {
      setAddressError("Error validating address");
      return false;
    }
  };

  // Fonction for save modifications
  const handleSaveChanges = async (values: any) => {
    const isAddressValid = await validateAddress(values.address);
    if (!isAddressValid) {
      console.log("Address validation failed");
      return;
    }

    console.log("Form values:", values);
    Swal.fire({
      title: "Success!",
      text: "Your profile has been updated successfully.",
      icon: "success"
    });
  };

  const initialValues = {
    email: data?.user?.email || "",
    name: data?.user?.name || "",
    address: "", 
    birthdate: "", 
    phoneNumber: "", 
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && <SignInWithGoogle />}
      {status === "authenticated" && (
        <>
          <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address:
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  {addressError && <div className="text-red-500 text-sm mt-1">{addressError}</div>}
                </div>

                <div className="mb-4">
                  <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                    Date of Birth:
                  </label>
                  <Field
                    type="date"
                    name="birthdate"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="birthdate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number:
                  </label>
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </Form>
            )}
          </Formik>
          <hr className="my-6 border-gray-300" />
          <SignOut />
        </>
      )}
    </div>
  );
}

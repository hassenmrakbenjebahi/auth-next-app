# Project Description

## Overview

This project is a web application developed with **Next.js** that allows users to:

- Create and authenticate their accounts via **OAuth2** (Google authentication).
- Edit their personal information, including:
  - First Name
  - Last Name
  - Date of Birth
  - Address
  - Phone Number

## Key Features

1. **OAuth2 Authentication**:  
   Users can sign in using their Google accounts for secure and easy authentication.

2. **Profile Management**:  
   After authentication, users can modify their profile information. The editable fields include their first name, last name, date of birth, address, and phone number.

3. **Address Validation**:  
   To ensure the validity of the address, the application integrates with the API from **[adresse.data.gouv.fr](https://adresse.data.gouv.fr/api-doc/adresse)**.  
   - The user’s address must be located within a **50 km radius of Paris**.
   - If the address is beyond this range or invalid, the application will return an error, and the user will need to provide a valid address.

## Technologies Used

- **Next.js**: For server-side rendering and creating a React-based web application.
- **Formik & Yup**: For handling forms and validation.
- **NextAuth**: For managing authentication with OAuth2.
- **axios**: To communicate with the external API for address validation.

## API Integration

- **[adresse.data.gouv.fr API](https://adresse.data.gouv.fr/api-doc/adresse)**:  
   This API is used to validate the user's address and calculate the distance from Paris to ensure it complies with the condition of being within 50 km.

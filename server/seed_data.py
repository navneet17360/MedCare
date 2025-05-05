import random
from datetime import datetime, timedelta

from app import create_app, db
from models.appointment import Appointment
from models.doctor import Doctor

doctors_data =[
    #Neurology
    {
        "name": "Tarun Mathur",
        "specialty": "Neurology",
        "years_experience": 9,
        "hospital_name": "G B H American Hospital",
        "address": "101, Meera Girls, College Road, Kothi Bagh, Bhatt Ji ki Bari, Udaipur",
        "description": "One of the most prolific neurologists in Udaipur.",
        "contact": "+91 2943056000",
        "charges": 1000,
        "availability": "Mon-Sat 10:00 AM–2:00 PM, 6:00 PM–7:30 PM",
        "image_url":"https://parashospitals-web.s3.ap-south-1.amazonaws.com/doctor-lists/May2024/RJ-UDP-00581.jpg"
    },
    {
        "name": "Huma Gauri",
        "specialty": "Neurology",
        "years_experience": 2,
        "hospital_name": "Geetanjali Medical College",
        "address": "Udaipur City, Udaipur, Rajasthan",
        "description": "Promising new neurologist, MBBS from Udaipur (2016).",
        "contact": "+91 2943056007",
        "charges": 300,
        "availability": "Mon-Tue 7:00 PM–9:00 PM, Wed 8:00 AM–9:00 AM",
        "image_url":"Not-available"
    },
    {
        "name": "A K Vats",
        "specialty": "Neurology",
        "years_experience": 15,
        "hospital_name": "Own Clinic",
        "address": "6-A, B Block, Shikarbadi, Goverdhan Villas, Near Inder Residency Hotel, Udaipur",
        "description": "Prominent neurologist with vast experience.",
        "contact": "+91 9152577761",
        "charges": 250,
        "availability": "Mon-Sat 10:00 AM–1:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/q7/9999pxxxx.xxxx.100901073826.s3q7/catalogue/dr-a-k-vats-goverdhan-villas-udaipur-rajasthan-neurologists-tqwrup.jpg"
    },
    {
        "name": "Pankaj Gandhi",
        "specialty": "Neurology",
        "years_experience": 5,
        "hospital_name": "Own Clinic",
        "address": "A 35, New Ahinsa Puri, Fatehpura, opp. Pava Vihar Vatika, Udaipur",
        "description": "Well-known and available even on Sundays.",
        "contact": "+91 9152655363",
        "charges": 300,
        "availability": "Mon-Sun 8:30 AM–7:30 PM",
        "image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzS0TKXmahSfF5dOhnGE77QHWc0SshzOsu2YVsH-rLKITUc_9C-t_mOE&usqp=CAE&s"
    },
    {
        "name": "Nikunj R Godhani",
        "specialty": "Neurology",
        "years_experience": 17,
        "hospital_name": "Krunesh Neuro and Spine Hospital",
        "address": "Near Raghu Mahal Hotel, Central Area, Udaipur",
        "description": "Famous for neuro and spine expertise.",
        "contact": "+91 9152748146",
        "charges": 350,
        "availability": "Mon-Sat 8:00 AM–1:00 PM, 4:00 PM–7:00 PM",
        "image_url":"https://medsurgeindia.com/wp-content/uploads/2024/06/Dr.-Nikunj-R-Godhani.webp"
    },
    {
        "name": "Tarun Kumar Ralot",
        "specialty": "Neurology",
        "years_experience": 11,
        "hospital_name": "Own Clinic (Inside Civil Hospital Campus)",
        "address": "Quarter no. D 2, Inside Civil Hospital Campus, near Girls hostel and Nursing College, Chetak Circle, Udaipur",
        "description": "Respected neurologist within Civil Hospital campus.",
        "contact": "+91 9468967338",
        "charges": 300,
        "availability": "Mon-Sat 3:00 PM–8:00 PM",
        "image_url":"https://tarunralot.carrd.co/assets/images/image01.jpg?v=90f69ee6"
    },
    {
        "name": "A A Saifee",
        "specialty": "Neurology",
        "years_experience": 10,
        "hospital_name": "Geetanjali Hospital",
        "address": "10 F, Fatehpura, Near Sewa Mandir, Udaipur City, Udaipur",
        "description": "Experienced neurologist serving Hiran Magri area.",
        "contact": "+91 9414284971",
        "charges": 250,
        "availability": "Mon-Sat 3:00 PM–6:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/y3/9999px294.x294.170724145731.e8y3/catalogue/dr-a-a-saifee-geetanjali-hospital--hiran-magri-udaipur-rajasthan-neurologists-riANjZK36w.jpg"
    },
    {
        "name": "Mayanka Seth",
        "specialty": "Neurology",
        "years_experience": 14,
        "hospital_name": "Medicare Sonography and Clinical Lab",
        "address": "Shop no. 7, Ground Floor, Shri Nath Complex, Udaipur",
        "description": "Expert in neuro diagnostics and clinical assessments.",
        "contact": "+91 7665000234",
        "charges": 300,
        "availability": "Mon-Sat 9:30 AM–6:30 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/n0/9999px294.x294.150803170509.d1n0/catalogue/dr-mayanka-seth-medicentre-sonography-and-clinical-lab--udaipur-city-udaipur-rajasthan-radiologist-doctors-36mp4ycn4s.jpg"
    },
    {
        "name": "Renu Khamesra",
        "specialty": "Neurology",
        "years_experience": 13,
        "hospital_name": "Geetanjali Hospital",
        "address": "Hiran Magri, Manwakhera, Near Goverdhan Villas, Udaipur",
        "description": "One of the top-rated neurologists in Udaipur.",
        "contact": "+91 2942500007",
        "charges": 350,
        "availability": "Mon-Sat 9:00 AM–3:00 PM",
        "image_url":"https://aiimsudr.ac.in/wp-content/uploads/2023/02/Dr.renujpg.jpg"
    },
    {
        "name": "Vishal Jogi",
        "specialty": "Neurology",
        "years_experience": 19,
        "hospital_name": "Arpan Neurology Centre",
        "address": "B 407, opp. Helmet Circle, near May Flower Hospital and Manav Mandir, Udaipur",
        "description": "Senior neurologist with extensive experience.",
        "contact": "+91 8469865577",
        "charges": 300,
        "availability": "Mon-Sat 11:30 AM–1:30 PM, 5:00 PM–8:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/v2/9999px294.x294.160921214540.g5v2/catalogue/dr-vishal-jogi-udaipur-city-udaipur-rajasthan-neurologists-3yem611.jpg"
    },
    #Dental
    {
        "name": "Dr. Ritu Garg",
        "specialty": "Dental",
        "years_experience": 16,
        "hospital_name": "Dr. Ritu’s Orthodontic & Dental Care",
        "address": "Dr. Ritu’s Orthodontic & Dental Care, Udaipur Shastri Circle",
        "description": "Dr. Ritu Garg has an experience of around 16 years in the field of dentistry. She is a BDS and MDS graduate and has worked at multiple institutions including Pacific and Darshan Dental Colleges. She is currently the Director at her own clinic.",
        "contact": "+1139588791",
        "charges": 200,
        "availability": "Mon-Sat 9:00 AM–2:00 PM, 4:00 PM–8:00 PM",
        "image_url": "https://imagesx.practo.com/providers/dr-ritu-garg-dentist-udaipur-4951a7a4-1b7d-425e-b5c4-fc584ed43135.jpg?i_type=t_70x70-2x-webp"
    },
    {
        "name": "Dr. Ashish Mathur",
        "specialty": "Dental",
        "years_experience": 8,
        "hospital_name": "Noble Dental Clinic",
        "address": "Noble Dental Clinic, V M Complex, Sector-6, Udaipur H Magri",
        "description": "Experienced dentist with 8 years in the field. Offers services like gum disease treatment and dental restoration. Member of IDA and Medical Practitioner Society.",
        "contact": "+918039659364",
        "charges": 100,
        "availability": "Mon-Sat 9:00 AM–1:00 PM, 4:00 PM–8:00 PM",
        "image_url": "https://imagesx.practo.com/providers/dr-ashish-mathur-dentist-udaipur-12ceaf40-7c6b-4fb4-99c6-18edb35dc227.jpg?i_type=t_70x70-2x-webp"
    },
    {
        "name": "Dr. Nikhil Verma",
        "specialty": "Dental",
        "years_experience": 16,
        "hospital_name": "Smilez Dental Care & Implant Center",
        "address": "Smilez Dental Care & Implant Center, 3rd floor, R Kay Mall, Panchvati, Udaipur City",
        "description": "Prosthodontist with 16 years experience. Provides services like metal brace, bridges, and dental implants. Member of IDA and Indian Prosthodontic Society.",
        "contact": "+1139589019",
        "charges": 200,
        "availability": "Mon-Sat 9:30 AM–8:30 PM",
        "image_url": "https://imagesx.practo.com/providers/dr-nikhil-verma-dentist-udaipur-eaec3165-e798-48f1-9dac-109eef599390.jpg?i_type=t_70x70-2x-webp"
    },
    {
        "name": "Dr. Jitendra Lohar",
        "specialty": "Dental",
        "years_experience": 7,
        "hospital_name": "Bhagyoday Dental Care",
        "address": "Bhagyoday Dental Care, sector 14, Gokul Tower, Near CA circle",
        "description": "Dentist with 7 years experience. Specializes in teeth whitening, gum disease treatment, and bleeding gum treatment.",
        "contact": "+911139587886",
        "charges": 150,
        "availability": "Mon-Sat 4:00 PM–8:00 PM, Sun 11:00 AM–2:00 PM",
        "image_url": "https://imagesx.practo.com/providers/dr-jitendra-lohar-dentist-udaipur-a27de741-e958-44f3-9f31-d6d6c132cc6f.jpg?i_type=t_70x70-2x-webp"
    },
    {
        "name": "Dr. Nitin Dungarwal",
        "specialty": "Dental",
        "years_experience": 7,
        "hospital_name": "Apple Dental Clinic",
        "address": "Apple Dental Clinic, opposite HDFC Bank, ChetaK Circle, Madhuban, Udaipur",
        "description": "Offers orthodontic treatment, dental fillings, and dental implant fixing. Director at Apple Dental Clinic since 2011.",
        "contact": "+918039659364",
        "charges": 100,
        "availability": "Mon-Sat 10:00 AM–2:00 PM, 4:00 PM–8:00 PM",
        "image_url": "https://imagesx.practo.com/providers/dr-nitin-dungarwal-dentist-udaipur-754b5c5f-617c-433f-bf80-7361f2f41170.jpg?i_type=t_70x70-2x-webp"
    },
    {
        "name": "Dr. Rajan",
        "specialty": "Dental",
        "years_experience": 23,
        "hospital_name": "Dr. Rajan’s Dental Clinic",
        "address": "Dr. Rajan’s Dental Clinic, #25, Tanishq towers, 2nd floor, Residency road, Near GPH American Hospital",
        "description": "Experienced dentist with 23 years in the field. Former professor and head at various dental colleges. Specializes in oral medicine.",
        "contact": "+911139588675",
        "charges": 200,
        "availability": "Mon-Sat 5:00 PM–9:00 PM",
        "image_url": "Not available"
    },
    #dermatology
    {
        "name": "Dr. Asit Mittal",
        "specialty": "dermatology",
        "years_experience": 5,
        "hospital_name": "Private Practice",
        "address": "House No 62, Road No 2, Ashok Nagar, Udaipur, Rajasthan 313001",
        "description": "One of the most renowned dermatologists in Udaipur with MBBS and MD (Skin and V.D), available mostly from 4:30 PM to 9:00 PM except Sundays.",
        "contact": "0294 252 1520",
        "charges": 250,
        "availability": "Mon-Sat 4:30 PM–9:00 PM",
        "image_url": "not available"
    },
    {
        "name": "Dr. Prashant Agrawal",
        "specialty": "dermatology",
        "years_experience": 6,
        "hospital_name": "Dermadent Clinic",
        "address": "60, 100 feet Road, Shobhagpura, Udaipur, Rajasthan – 313011",
        "description": "Experienced dermatologist offering a wide range of skin treatments including acne, wrinkles, hair loss, and laser procedures.",
        "contact": "093520 82112",
        "charges": 500,
        "availability": "Mon-Sat 10:00 AM–1:00 PM, 4:00 PM–7:00 PM",
        "image_url": "https://content.jdmagicbox.com/comp/udaipur-rajasthan/l9/9999px294.x294.140130215228.b7l9/catalogue/dr-prashant-agrawal-dermadent-clinic--shobhagpura-udaipur-rajasthan-dermatologists-ng6t7.jpg"
    },
    {
        "name": "Dr. A K Khare",
        "specialty": "dermatology",
        "years_experience": 15,
        "hospital_name": "Private Practice",
        "address": "4-5, Hiran Magri, Mayur One Colony, Near Menaria Guest House, Udaipur, Rajasthan – 313002",
        "description": "MBBS, MD, DNB, PDCC. Known for patient-centric care and clinical excellence.",
        "contact": "0294 246 0022",
        "charges": 250,
        "availability": "Mon-Sat 5:00 PM–7:00 PM",
        "image_url": "https://content.jdmagicbox.com/comp/udaipur-rajasthan/dc/9999pxxxx.xxxx.090902214526.c5d9dc/catalogue/dr-a-k-khare-hiran-magri-udaipur-rajasthan-dermatologists-m8ry1.jpg"
    },
    {
        "name": "Dr. Sudhir Tomar",
        "specialty": "dermatology",
        "years_experience": 9,
        "hospital_name": "Private Clinic",
        "address": "300 Block B, Hiran Magri, Sector 14, Udaipur City-313001",
        "description": "Celebrated dermatologist with extensive practice hours and high patient satisfaction.",
        "contact": "+91 91524 43093",
        "charges": 450,
        "availability": "Mon-Sat 9:00 AM–1:00 PM, 5:00 PM–8:00 PM",
        "image_url": "not available"
    },
    {
        "name": "Dr. Sharad Mehta",
        "specialty": "dermatology",
        "years_experience": 6,
        "hospital_name": "Shrinath Plaza Clinic",
        "address": "21 Shrinath Plaza, M B Hospital Road, Madhuban, Udaipur-Rajasthan – 313001",
        "description": "Experienced MBBS and MD(DVL) dermatologist known for his depth of knowledge and quality care.",
        "contact": "088756 63606",
        "charges": 400,
        "availability": "Mon-Sat",
        "image_url": "https://content.jdmagicbox.com/comp/udaipur-rajasthan/m1/9999px294.x294.131108121425.m6m1/catalogue/dr-sharad-mehta-madhuban-udaipur-rajasthan-dermatologists-4dv9fn1uzt.jpg"
    },
    {
        "name": "Dr. Manisha Balai",
        "specialty": "dermatology",
        "years_experience": 5,
        "hospital_name": "Crystal Plaza Clinic",
        "address": "Sector 9, Crystal Plaza, Hiran Magri, Udaipur-Rajasthan",
        "description": "Offers treatments including hair loss, acne, botox, anti-aging. Dedicated to excellent patient care.",
        "contact": "08503959788",
        "charges": 200,
        "availability": "Mon-Sat 5:00 PM–8:00 PM",
        "image_url": "https://content.jdmagicbox.com/comp/udaipur-rajasthan/g3/9999px294.x294.131126114007.q3g3/catalogue/dr-manisha-balai-hiran-magri-udaipur-rajasthan-dermatologists-k414p1bmy5.jpg"
    },
    {
        "name": "Dr. Ahmed Khalil",
        "specialty": "dermatology",
        "years_experience": 12,
        "hospital_name": "Private Clinic",
        "address": "2-Kha-24, Shanti Nagar, Sector 5, Hiran Magri, Udaipur-Rajasthan – 313002",
        "description": "Renowned dermatologist offering expert dermatology care in a clean, stress-free environment.",
        "contact": "+91 9828714620",
        "charges": 300,
        "availability": "Mon-Sat",
        "image_url": "https://www.chaudharyhospital.in/wp-content/uploads/2019/03/dr-Khalil-Ahmad-Dermatologist-2-1-150x150.png"
    },
    #Cardiologist
    {
        "name": "Ramesh Patel",
        "specialty": "Cardiology",
        "years_experience": 17,
        "hospital_name": "Geetanjali Hospital",
        "address": "2 Kha 29, Chaudhary Hospital Road, Opp. Lions Club, Sec 5, Hiran Magri, Udaipur-313002",
        "description": "Interventional Cardiologist with expertise in ASD, VSD, PDA device closure, complex coronary angiography, balloon valvuloplasty, structural and pediatric cardiology.",
        "contact": "Not available",
        "charges": 300,
        "availability": "Not specified",
        "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.-ramesh-patel%20(2).jpg"
    },
    {
        "name": "Dilip Jain",
        "specialty": "Cardiology",
        "years_experience": 19,
        "hospital_name": "DHADKAN HEART CARE",
        "address": "Ground Floor, Shrinath Plaza, Opposite MB Hospital, Near Chetak Circle, Udaipur-313001",
        "description": "Senior Interventional Cardiologist with expertise in adult and pediatric cardiac and endovascular procedures.",
        "contact": "Not available",
        "charges": 400,
        "availability": "Monday-Saturday: 4:00 pm - 8:00 pm, Sunday: Closed",
        "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.-dilip-jain.jpg"
    },
    {
        "name": "Jai Bharat Sharma",
        "specialty": "Cardiology",
        "years_experience": 10,
        "hospital_name": " Geetanjali Medical College and Hospital ",
        "address": "Geetanjali Medical College and Hospital - Gmch Hiranmagri Extension, Manwakhera, Nh8 Bypass, Uda, Near Eklingpura Chouraha-313002 (Near Eklingpura Chouraha)",
        "description": "Specialist in adult and pediatric interventions, coronary angiography, pacemakers, structural interventions, and advanced imaging. Author of 15+ publications.",
        "contact": "Not available",
        "charges": 600,
        "availability": "Monday-Saturday: 10:00 am - 8:00 pm",
        "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.-jai-bharat-sharma.jpg"
    },
    {
        "name": "Amit Khandelwal",
        "specialty": "Cardiology",
        "years_experience": 19,
        "hospital_name": "Paras Health Udaipur",
        "address": "New Bhupalpura, Rupsagar, Udaipur-313001",
        "description": "Director and Head of Cardiac Sciences. Specializes in interventional cardiology, rare cardiac disorders, and pacemaker implantation. Recognized as Best Cardiologist in Southern Rajasthan.",
        "contact": "09116113839",
        "charges": 500,
        "availability": "Monday-Saturday: 4:00 pm - 7:00 pm, Sunday: Closed",
        "image_url": "https://parashospitals-web.s3.ap-south-1.amazonaws.com/doctor-lists/May2024/RJ-UDP-00491.jpg"
    },
    #Otology
    {
    "name": "A.K. Gupta",
    "specialty": "Otology",
    "years_experience": 45,
    "hospital_name": "GMCH",
    "address": "26, Navratan Complex, Betla Road, Fatehpura, Udaipur-313001",
    "description": "Renowned ENT specialist with over 45 years of experience. Expert in all types of ENT surgeries. Frequent speaker at regional and national conferences and mentor to many students.",
    "contact": "09414156888",
    "charges": 600,
    "availability": "Monday-Saturday: 4:30 pm - 6:30 pm, Sunday: Closed",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20a.k.%20gupta.jpg"
  },
  {
    "name": "Pritosh Sharma",
    "specialty": "Otology",
    "years_experience": 12,
    "hospital_name": "GMCH",
    "address": "Geetanjali Medical College and Hospital - Gmch Hiranmagri Extension, Manwakhera, Nh8 Bypass, Uda, Near Eklingpura Chouraha-313002 (Near Eklingpura Chouraha)",
    "description": "ENT surgeon with over 10 years of experience. Specializes in Rhinology, Skull base, and Head & Neck surgeries. Has published six papers in international and national journals.",
    "contact": "Not available",
    "charges": 400,
    "availability": "Monday-Saturday: 4:30 pm - 6:30 pm, Sunday: Closed",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20pritosh%20sharma.jpg"
  },
  {
    "name": "Nitin Sharma",
    "specialty": "Otology",
    "years_experience": 11,
    "hospital_name": "GMCH",
    "address": "141, Nakoda Nagar, Sector 3, Hiran Magri, Udaipur, Rajasthan 313001",
    "description": "ENT surgeon specialized in a wide range of procedures including Coblator-assisted surgeries, Tympanoplasty, Mastoidectomy, Rhinological and Micro Laryngeal Surgeries, FESS, DCR and more.",
    "contact": "+91-294-2500000-06, +91-294-2500007",
    "charges": 350,
    "availability": "Monday-Saturday: 4:30 pm - 6:30 pm, Sunday: Closed",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20nitin%20sharma.jpg"
  },
  #Physician
  {
    "name": "Rahul Pancholi",
    "specialty": "Physician",
    "years_experience": 5,
    "hospital_name": "Om Sai Clinic",
    "address": "Haridwar Bhawan Bhabrana, Verai Mata Temple, Bhabrana, Udaipur",
    "description": "Worked as a medicine resident at DCBH Govt Hospital, Delhi and as a medical officer with Govt of Rajasthan at PHC level.",
    "contact": "N/A",
    "charges": 151,
    "availability": "Monday-Sunday: 12:00 AM - 11:59 PM",
    "image_url": "https://imagesx.practo.com/providers/dr-rahul-pancholi-general-physician-udaipur-16e6efdf-aa00-4f25-84a0-ea9d79249170.jpg?i_type=t_70x70-2x-webp"
  },
  {
    "name": "Madhu Nahar Roy",
    "specialty": "Physician",
    "years_experience": 33,
    "hospital_name": "Paras Hospital",
    "address": "Shobhagpura, Udaipur, Rajasthan",
    "description": "Senior Consultant in Internal Medicine with expertise in Critical Care and Infectious Disease. Heads Preventive Health Check-ups at Fortis Escorts Hospital, Jaipur.",
    "contact": "N/A",
    "charges": 650,
    "availability": "Monday-Saturday: 10:00 AM - 03:00 PM",
    "image_url": "https://imagesx.practo.com/providers/dr-madhu-nahar-roy-general-physician-jaipur-35d51cce-b523-439e-ba90-eca1673ea65e.jpg?i_type=t_70x70-2x-webp"
  },
  {
    "name": "Nirdesh Thakore",
    "specialty": "Physician",
    "years_experience": 9,
    "hospital_name": "Thakore's Clinic",
    "address": "101, Rose Block, Manglam Rose Apartment, Mahaveer Colony, Near Chawats Sports Academy, Bhuwana, Udaipur",
    "description": "FNB in Critical Care Medicine from Sir Gangaram Hospital, Delhi. Specializes in critical and very sick patients.",
    "contact": "N/A",
    "charges": 800,
    "availability": "Monday-Sunday: 09:00 AM - 09:00 PM",
    "image_url": "https://imagesx.practo.com/providers/dr-nirdesh-thakore-critical-care-medicine-udaipur-3cdd89c8-70f4-4f41-94df-25a2bc0600d9.jpg?i_type=t_70x70-2x-webp"
  },
  {
    "name": "D.C. Kumawat",
    "specialty": "Physician",
    "years_experience": 38,
    "hospital_name": "GMCH",
    "address": "31, Sector 11, Paras Chauraha, Behind Bajaj Showroom, Hiran Magri, Udaipur-313002",
    "description": "Veteran physician acclaimed for managing complex medical disorders. Over 40 publications in national and international journals.",
    "contact": "N/A",
    "charges": 100,
    "availability": "Monday-Saturday: 4:00 PM - 6:30 PM, Sunday: Closed",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20d.c.%20kumawat.jpg"
  },
  {
    "name": "Abhijeet Basu",
    "specialty": "Physician",
    "years_experience": 12,
    "hospital_name": "Geetanjali Hospital",
    "address": "Hiran Magri, NH-8, Bypass, Near Eklingpura Chauraha, Udaipur-313001",
    "description": "Expert in chronic ailments, lifestyle diseases, infectious diseases, and immunology.",
    "contact": "N/A",
    "charges": 600,
    "availability": "Tuesday & Thursday: 9:00 AM - 2:00 PM",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20abhijeet%20basu.jpg"
  },
  {
    "name": "Lalit Shrimali",
    "specialty": "Physician",
    "years_experience": 12,
    "hospital_name": "GMCH",
    "address": "Opp. BN Degree College, Near Maruti Nexa Showroom, Subhash Nagar, Udaipur-313001",
    "description": "Expert in diagnosis of internal conditions and infectious disease management. 12 journal publications.",
    "contact": "N/A",
    "charges": 450,
    "availability": "Monday-Saturday: 7:00 AM - 8:30 AM & 6:00 PM - 8:00 PM, Sunday: 11:00 AM - 1:00 PM",
    "image_url": "https://www.geetanjalihospital.co.in/img/media/cache/faculty/360x360/1011/dr.%20lalit%20shrimali.jpg"
  },
  {
    "name": "Kavita Badjatiya",
    "specialty": "Physician",
    "years_experience": 30,
    "hospital_name": "Victoria Hospital",
    "address": "Hiran Magri, Udaipur",
    "description": "MBBS from RNT College, Udaipur. General Physician with 30 years of experience.",
    "contact": "N/A",
    "charges": 200,
    "availability": "Mon-Fri: 08:00 AM - 10:00 PM, Sat-Sun: 10:00 AM - 02:00 PM",
    "image_url": "https://imagesx.practo.com/providers/dr-kavita-badjatiya-general-physician-udaipur-10cee844-88c8-4d0a-b8ad-9c9f9499ffea.jpg?i_type=t_70x70-2x-webp"
  },
  {
    "name": "Deepak Garg",
    "specialty": "Physician",
    "years_experience": 8,
    "hospital_name": "American Hospital",
    "address": "Madhuban, Udaipur",
    "description": "Highly rated general physician (5.0 stars). Offers personalized care. Known for excellence and accessibility.",
    "contact": "N/A",
    "charges": 350,
    "availability": "Monday-Saturday: 9:30 AM - 4:30 PM, Sunday: Closed",
    "image_url": "https://www.gbhamericanhospital.com/wp-content/uploads/2023/09/Dr.-Deepak-Garg-02-150x150@2x.jpg"
  },
  {
    "name": "Prerna Bahety",
    "specialty": "Physician",
    "years_experience": 5,
    "hospital_name": "American Hospital",
    "address": "Udaipur, Rajasthan",
    "description": "Reputed general physician (4.9 stars). Committed to high-quality, personalized care.",
    "contact": "N/A",
    "charges": 250,
    "availability": "Monday-Saturday: 9:00 AM - 3:30 PM, Sunday: Closed",
    "image_url": "https://www.gbhamericanhospital.com/wp-content/uploads/2022/01/Prerna-Baheti-Family-Medicine-3-Copy-150x150@2x.jpg"
  }
]

app = create_app()

with app.app_context():
    Appointment.query.delete()
    Doctor.query.delete()
    db.session.commit()

    doctors = []
    for doc_data in doctors_data:
        doctor = Doctor(**doc_data)
        db.session.add(doctor)
        doctors.append(doctor)
    db.session.commit()
    print("Dummy data seeded successfully!")
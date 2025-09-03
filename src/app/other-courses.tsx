"use client";

import { Typography } from "@material-tailwind/react";
import CourseCard from "@/src/components/course-card";

const OTHER_COURSES = [
  {
    img: "/image/online-course.png",
    title: "Dr. Nirjesh",
    desc: "Dr. Nirjesh is a Consulting speech and therapist Specialist practising at name Clinic in address.\
     With an degree and a DCH (Diploma in Child Health) as his postgraduate qualifications, He has been \
     specialising in general pediatrics and neonatology for the past 20+ years. \
    Facilities available at Clinic include vaccination, nebulisation, lab collection and dietary counselling..",
    buttonLabel: "Read More",
  }
];

export function OtherCourses() {
  return (
    <section className="pb-20 px-8">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-3">
          About Us
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-12/12"
        >
          Discover the exceptional care and personalized attention of NHSC team of \
          audiologists and hearing aid specialists. Our highly trained and experienced professionals \
          are dedicated to improving the lives of those with hearing loss through top-notch hearing care services.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-1">
        {OTHER_COURSES.map((props, idx) => (
          <CourseCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default OtherCourses;

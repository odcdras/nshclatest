"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import {
  ClipboardDocumentCheckIcon,
  CheckBadgeIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";

import FeatureCard from "@/src/components/feature-card";

const FEATURES = [
  {
    icon: BeakerIcon,
    title: "Hearing Testing",
    description:
      "A hearing test provides an evaluation of the sensitivity of a person's sense of hearing through \
      digital diagnostic hearing assessments like pure tone audiometry, tympanometry, and otoacoustic emissions (OAE).",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Hearing Aid Trial",
    description:
      "We have a wide range of hearing aids with advanced hearing technology. We do hearing aid accessories which will \
      suit your lifestyle and make it more stylish and comfortable.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Hearing Aid Fitting",
    description: "Our team of audiologists takes into account various factors such as your lifestyle, hearing preferences \
    and even your personal style during the hearing aid fitting process. We ensure \
    that the hearing aid not only improves your ability to hear but also matches your individuality..",
  },
];

export function OnlineCourse() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3">
        <div className="col-span-1 rounded-xl lg:mb-0 mb-12">
          <Image
            width={768}
            height={500}
            src="/image/online-course.png"
            className="h-full max-h-[500px] w-full object-cover scale-110"
            alt="Services Offered"
          />
        </div>
        <div className="col-span-2 lg:pl-24">
          <Typography variant="h2" color="blue-gray" className="mb-4">
          Our Services
          </Typography>
          <Typography
            variant="lead"
            className="mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0  "
          >
            Various type of hearing aid available. Talk to our hearing aid expert. Choose from different hearing aid models & visit our hearing aids shop near you.
          </Typography>

          <div className="col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3 ">
            {FEATURES.map(({ icon, title, description }) => (
              <FeatureCard key={title} icon={icon} title={title}>
                {description}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnlineCourse;

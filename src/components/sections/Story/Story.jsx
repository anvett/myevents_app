"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ModalBase from "@/components/ui/Modal/ModalBase";

import {
  Heart,
  Map,
  Gem,
  Camera,
  Gift,
  MessageCircle
} from "lucide-react";

const iconMap = {
  heart: Heart,
  map: Map,
  ring: Gem,
  camera: Camera,
  gift: Gift,
  message: MessageCircle
};

export default function Story({
  config = {},
  variant = "default",
  theme = {}
}) {

  const { title, intro, events = [] } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <section className="relative">

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* TITULO */}

          {title && (
            <div className="text-center mb-12">

              <h2
                className={`typo-h1 ${fonts?.accent || ""} ${colors?.primary || ""}`}
              >
                {title}
              </h2>

              {intro && (
                <p
                  className={`mt-4 typo-body ${fonts?.body || ""} ${colors?.secondary || ""}`}
                >
                  {intro}
                </p>
              )}

            </div>
          )}

          {/* TIMELINE */}

          <div className="relative">

            {/* LINEA CENTRAL */}

            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/30 transform md:-translate-x-1/2" />

            <div className="space-y-16">

              {events.map((event, index) => {

                const Icon = iconMap[event.icon] || Heart;

                const isEven = index % 2 === 0;

                return (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative grid md:grid-cols-2 md:gap-12 items-center"
                  >

                    {/* ICONO */}

                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-0 bg-white rounded-full p-2 shadow">

                      <Icon className="w-5 h-5 text-primary" />

                    </div>

                    {/* COLUMNA IZQUIERDA */}

                    <div
                      className={`
                      ${isEven ? "md:order-1" : "md:order-2"}
                      pl-12 md:pl-0
                      `}
                    >

                      {/* FECHA */}

                      <p
                        className={`text-sm mb-2 ${colors?.secondary || ""}`}
                      >
                        {event.date}
                      </p>

                      {/* TITULO */}

                      <h3
                        className={`typo-h3 ${fonts?.heading || ""} ${colors?.primary || ""}`}
                      >
                        {event.title}
                      </h3>

                      {/* DESCRIPCION */}

                      <p
                        className={`mt-2 ${fonts?.body || ""}`}
                      >
                        {event.description}
                      </p>

                      {/* MINIATURA MOBILE */}

                      {event.image && (

                        <div className="mt-4 md:hidden flex justify-center">

                          <div
                            onClick={() => openModal(event)}
                            className="w-24 h-24 relative rounded-lg overflow-hidden shadow cursor-pointer"
                          >

                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />

                          </div>

                        </div>

                      )}

                    </div>

                    {/* IMAGEN DESKTOP */}

                    {event.image && (

                      <div
                        className={`
                        hidden md:block
                        ${isEven ? "md:order-2" : "md:order-1"}
                        `}
                      >

                        <div
                          onClick={() => openModal(event)}
                          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        >

                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover hover:scale-105 transition"
                          />

                        </div>

                      </div>

                    )}

                  </motion.div>

                );

              })}

            </div>

          </div>

        </div>

      </section>

      {/* MODAL */}

      <ModalBase
        open={!!selectedEvent}
        onClose={closeModal}
        colors={colors}
        maxWidth="max-w-2xl"
      >

        {selectedEvent && (

          <div>

            {/* IMAGEN */}

            {selectedEvent.image && (

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6">
                

                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                

              </div>

            )}

            {/* TITULO */}

            <h3
              className={`typo-h2 ${fonts?.heading || ""} ${colors?.primary || ""}`}
            >
              {selectedEvent.title}
            </h3>

            {/* DESCRIPCION */}

            <p className={`mt-4 ${fonts?.body  || ""} ${colors?.dark || ""}` }>
              {selectedEvent.description}
            </p>

          </div>

        )}

      </ModalBase>

    </>
  );
}
import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import clsx from "clsx";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento: FC<BentoProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
        field={slice.primary.heading}
      />

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.primary.group.map(
          (item: Content.BentoSliceDefaultPrimaryGroupItem) => (
            <div
              key={asText(item.title)}
              className={clsx(
                "glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4",
                item.wide ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <h3 className="text-2xl">
                <PrismicText field={item.title} />
              </h3>
              <div className="max-w-md text-balance text-slate-300">
                <PrismicRichText field={item.body} />
              </div>
              <PrismicNextImage
                className="max-h-36 w-auto"
                field={item.image}
                fallbackAlt=""
                alt=""
              />
            </div>
          )
        )}
      </div>
    </Bounded>
  );
};
//1:53
export default Bento;

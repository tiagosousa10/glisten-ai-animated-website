import { FC, JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies: FC<CaseStudiesProps> = async ({
  slice,
}): Promise<JSX.Element> => {
  const client = createClient();

  const caseStudies = await Promise.all(
    slice.primary.rzone.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id
        );
      }
    })
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />

      <div className="mt-20 grid gap-16">
        {caseStudies.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
                key={caseStudy.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3 hover:cursor-pointer "
              >
                <h3 className="4xl">
                  <PrismicText field={caseStudy.data.company} />
                </h3>
                <div className="max-w-md">
                  <PrismicRichText field={caseStudy.data.description} />
                </div>
                <PrismicNextLink
                  document={caseStudy}
                  className="after:absolute after:inset-0 hover:underline"
                />
                Read <PrismicText field={caseStudy.data.company} />
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default CaseStudies;

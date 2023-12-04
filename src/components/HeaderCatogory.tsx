import { BiChevronDown } from "react-icons/bi";
import { FC, useState } from "react";
import { headerCategories } from "../assets/HeaderCatogoryData";
import {  HeaderCategory, SubCategory } from "../assets/types";

interface headerCategoriesProps {
  headerCategories: HeaderCategory[]
}

export const HeaderCatogory: FC<headerCategoriesProps> = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [findSubCetogory, setFindSubCetogory] = useState<
    SubCategory[] | undefined
  >([]);

  const handleMouseEnter = (categoryName: string) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };
  const handleHoverCategory = (categoryName: string) => {
    // console.log(categoryName);
    let foundSubCategory: SubCategory[] | undefined;
    if (categoryName) {
      const foundCategory = headerCategories.find(
        (item) => item.title === categoryName
      );
      if (foundCategory && foundCategory.subCategories) {
        foundSubCategory = foundCategory.subCategories;
      } else {
        foundSubCategory = undefined;
      }
      // console.log(foundSubCategory)
    }
    setFindSubCetogory(foundSubCategory);
  };

  // console.log(findSubCetogory);
  return (
    <div className="flex   gap-1 flex-shrink-0 justify-between bg-[#e4adff] md:bg-white md:gap-3 header-category-img-p  relative">
      {headerCategories?.map((category, index) => (
        <div
          key={index}
          className="mob-header-category-img-p cursor-pointer md:header-category-img-p group flex flex-col justify-between relative"
          onMouseEnter={() => handleMouseEnter(category.title)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={category.img}
            alt={category.title}
            className="w-[60px] md:w-full object-cover"
            onMouseEnter={() => handleHoverCategory(category.title)}
          />
          <span className="flex">
            <h6 className="primary-font font-semibold">{category.title}</h6>
            <span className="hidden md:block transition-transform ease-in-out group-hover:rotate-180">
              <BiChevronDown />
            </span>
          </span>
          {/* Display subcategories on hover */}
          {hoveredCategory === category.title && (
            <ul
              onMouseEnter={() => handleHoverCategory(category.title)}
              className="hidden md:block absolute w-[200px] top-[120px] left-0 bg-white shadow-2xl shadow-slate-700 px-2 py-1 rounded-sm z-50"
            >
              {findSubCetogory &&
                Array.from(findSubCetogory)?.map((item, subIndex) => (
                  <li
                    key={subIndex}
                    className="primary-font font-semibold py-2 px-1 cursor-pointer"
                  >
                    {item?.category}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

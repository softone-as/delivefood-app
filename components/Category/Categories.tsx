import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient from "../../sanity-deliveroo-clone/sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type == 'category']
        `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories
        ?.filter(
          (data: any) => data._id != "7dd75698-838c-45f4-927e-10d70b2fda05"
        )
        .map((category: any) => (
          <CategoryCard
            key={category._id}
            id={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        ))}
    </ScrollView>
  );
};

export default Categories;

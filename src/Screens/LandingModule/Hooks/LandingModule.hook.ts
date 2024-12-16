import { createListCollection } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { getAllCategories } from "../HttpsAction/LandingModule.https";
import { getAllCategoriesHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getAllCategories.interfce";
import { toaster } from "../../../Components/ui/toaster";

export const useLandingModule = () => {
  const [state, setState] = useState<getAllCategoriesHttpsData[]>([]);

  const categories = useMemo(() => {
    return createListCollection<getAllCategoriesHttpsData>({
      items: state || [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.name,
    });
  }, [state?.length]);

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  const getCategories = async () => {
    if (state.length === 0) {
      const response = await getAllCategories();
      if (response.status === true && response.data) {
        setState(response.data);
      } else {
        toaster.create({
          type: "error",
          title: "Failed",
          description: response.message,
          duration: 3000,
        });
      }
    }
  };

  return { frameworks, getCategories, categories };
};

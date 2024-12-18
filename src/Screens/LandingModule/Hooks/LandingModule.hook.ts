import { createListCollection, SelectValueChangeDetails } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { createSession, fetchSubCategory, getAllCategories } from "../HttpsAction/LandingModule.https";
import { getAllCategoriesHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getAllCategories.interfce";
import { toaster } from "../../../Components/ui/toaster";
import { useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom";
import { getSubCategoriesByCategoryIdHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getSubCategoriesByCategoryId.interface";
import { CreateSessionHttpsRequest } from "../../../Common/AxiosInterceptor/Interview/interfaces/createSession.interface";
import { useDispatch } from "react-redux";
import { setQuestions } from "../../../Redux/QuestionsSlice/QuestionsSlice";

export const useLandingModule = () => {
  const [allCategories, setAllCategories] = useState<getAllCategoriesHttpsData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ _id: string; name: string } | undefined>();
  const [subCategories, setSubCategories] = useState<getSubCategoriesByCategoryIdHttpsData[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{ _id: string; name: string } | undefined>();
  const [difficulty, setDifficulty] = useState("");
  const [isStartInterviewLoading, setIsStartInterviewLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const difficultyList = createListCollection({
    items: [
      { label: "Easy", value: "Easy" },
      { label: "Medium", value: "Medium" },
      { label: "Hard", value: "Hard" },
      { label: "Hardest", value: "Hardest" },
    ],
  });

  const getSubCategory = async () => {
    if (!selectedCategory) {
      toaster.create({
        type: "info",
        title: "Please Select Category",
        description: "Please Select Category The Category List",
        duration: 3000,
      });
      return;
    }
    const response = await fetchSubCategory(selectedCategory._id);
    if (response.status && response.data) {
      setSubCategories(response.data);
    } else {
      toaster.create({
        type: "error",
        title: "Failed To Fetch SubCategories",
        description: response.message,
        duration: 3000,
      });
    }
  };

  const categories = useMemo(() => {
    return createListCollection<getAllCategoriesHttpsData>({
      items: allCategories,
      itemToString: (item) => item.name,
      itemToValue: (item) => item._id,
    });
  }, [allCategories?.length]);

  const subCategoriesList = useMemo(() => {
    return createListCollection<getSubCategoriesByCategoryIdHttpsData>({
      items: subCategories,
      itemToString: (item) => item.name,
      itemToValue: (item) => item._id,
    });
  }, [subCategories]);

  const getCategories = async () => {
    if (allCategories.length === 0) {
      const response = await getAllCategories();
      if (response.status === true && response.data) {
        setAllCategories(response.data);
      } else {
        toaster.create({
          type: "error",
          title: "Failed To Fetch Categories",
          description: response.message,
          duration: 3000,
        });
      }
    }
  };

  const handleSelectedCategory = (item: SelectValueChangeDetails<getAllCategoriesHttpsData>) => {
    setSelectedCategory({ _id: item.value[0], name: item.items[0].name });
    setSubCategories([]);
    setSelectedSubCategory(undefined);
  };

  const handleSelectedSubCategory = (item: SelectValueChangeDetails<getSubCategoriesByCategoryIdHttpsData>) => {
    setSelectedSubCategory({ _id: item.value[0], name: item.items[0].name });
  };
  const handleDifficulty = (item: SelectValueChangeDetails) => {
    setDifficulty(item.value[0]);
  };

  const startInterview = async () => {
    setIsStartInterviewLoading(true);
    if (!selectedCategory) {
      toaster.create({
        type: "info",
        title: "Select Category",
        description: "Please select category to proceed",
        duration: 3000,
      });
    } else if (!selectedSubCategory) {
      toaster.create({
        type: "info",
        title: "Select Sub-Category",
        description: "Please select sub-category to proceed",
        duration: 3000,
      });
    } else if (!difficulty) {
      toaster.create({
        type: "info",
        title: "Select Difficulty",
        description: "Please select Difficulty to proceed",
        duration: 3000,
      });
    } else {
      const payload: CreateSessionHttpsRequest = {
        category_id: selectedCategory?._id,
        sub_category_id: selectedSubCategory._id,
        difficulty: difficulty,
        tech: selectedSubCategory.name,
      };
      const response = await createSession(payload);

      if (response.status && response.data) {
        dispatch(setQuestions(response.data.questions));
        navigate(`/interview/${response.data.sessionData._id}`);
      } else {
        toaster.create({
          type: "error",
          title: "Failed To Create Session",
          description: response.message,
          duration: 3000,
        });
      }
    }
    setIsStartInterviewLoading(false);
  };

  return {
    isStartInterviewLoading,
    startInterview,
    handleDifficulty,
    difficultyList,
    getSubCategory,
    handleSelectedSubCategory,
    subCategoriesList,
    getCategories,
    categories,
    handleSelectedCategory,
  };
};

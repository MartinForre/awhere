import { useEffect, Dispatch, useState } from "react";
import { AsyncStorage } from "react-native";
import { AppAction, MyState } from "../store";

const usePersistedMe = (me: MyState, dispatch: Dispatch<AppAction>) => {
  const [isFetching, setIsFetching] = useState(true);

  const loadPersistedData = async () => {
    try {
      setIsFetching(true);
      const data = await AsyncStorage.getItem("me");
      if (data != null) {
        const me = JSON.parse(data) as MyState;
        dispatch({ type: "reset me", me });
      }
    } catch (e) {
      console.error(e);
    }

    setIsFetching(false);
  };

  const persistData = async (me: MyState) => {
    try {
      await AsyncStorage.setItem("me", JSON.stringify(me));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPersistedData();
  }, []);

  useEffect(() => {
    persistData(me);
  }, [me]);

  return isFetching;
};

export default usePersistedMe;

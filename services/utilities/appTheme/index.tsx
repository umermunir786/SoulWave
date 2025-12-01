import { Colors } from "@/constants/Colors";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

interface ThemeContextType {
  theme: "light" | "dark";
  colors: (typeof Colors)["light" | "dark"];
  setThemeManually: (newTheme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === "light" || colorScheme === "dark") {
        setTheme(colorScheme);
      }
    });

    return () => subscription.remove();
  }, []);

  const setThemeManually = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colors: Colors[theme], setThemeManually }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };

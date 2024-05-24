

// src/fontFamily.js

import { useFonts } from 'expo-font';
import { 
  Montserrat_100Thin, Montserrat_200ExtraLight, Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold,
  Montserrat_700Bold, Montserrat_800ExtraBold, Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import { 
  Barlow_100Thin, Barlow_100Thin_Italic, Barlow_200ExtraLight, Barlow_200ExtraLight_Italic, Barlow_300Light, Barlow_300Light_Italic, 
  Barlow_400Regular, Barlow_400Regular_Italic, Barlow_500Medium, Barlow_500Medium_Italic, Barlow_600SemiBold, Barlow_600SemiBold_Italic, 
  Barlow_700Bold, Barlow_700Bold_Italic, Barlow_800ExtraBold, Barlow_800ExtraBold_Italic, Barlow_900Black, Barlow_900Black_Italic 
} from '@expo-google-fonts/barlow';
import { 
  OpenSans_300Light, OpenSans_300Light_Italic, OpenSans_400Regular, OpenSans_400Regular_Italic, OpenSans_500Medium, OpenSans_500Medium_Italic, 
  OpenSans_600SemiBold, OpenSans_600SemiBold_Italic, OpenSans_700Bold, OpenSans_700Bold_Italic, OpenSans_800ExtraBold, OpenSans_800ExtraBold_Italic 
} from '@expo-google-fonts/open-sans';
import { 
  Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, 
  Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, 
  Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic 
} from '@expo-google-fonts/poppins';
import { 
  Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';
import { 
  Roboto_100Thin, Roboto_100Thin_Italic, Roboto_300Light, Roboto_300Light_Italic, Roboto_400Regular, Roboto_400Regular_Italic, 
  Roboto_500Medium, Roboto_500Medium_Italic, Roboto_700Bold, Roboto_700Bold_Italic, Roboto_900Black, Roboto_900Black_Italic 
} from '@expo-google-fonts/roboto';
import { 
  SourceSans3_200ExtraLight, SourceSans3_200ExtraLight_Italic, SourceSans3_300Light, SourceSans3_300Light_Italic, SourceSans3_400Regular, 
  SourceSans3_400Regular_Italic, SourceSans3_500Medium, SourceSans3_500Medium_Italic, SourceSans3_600SemiBold, SourceSans3_600SemiBold_Italic, 
  SourceSans3_700Bold, SourceSans3_700Bold_Italic, SourceSans3_800ExtraBold, SourceSans3_800ExtraBold_Italic, SourceSans3_900Black, SourceSans3_900Black_Italic 
} from '@expo-google-fonts/source-sans-3';
import { 
  Spartan_100Thin, Spartan_200ExtraLight, Spartan_300Light, Spartan_400Regular, Spartan_500Medium, Spartan_600SemiBold, Spartan_700Bold, 
  Spartan_800ExtraBold, Spartan_900Black 
} from '@expo-google-fonts/spartan';
import { Alata_400Regular } from '@expo-google-fonts/alata';
import { Anton_400Regular } from '@expo-google-fonts/anton';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

const useCustomFonts = () => {
  return useFonts({
    Alata: Alata_400Regular,
    Anton: Anton_400Regular,
    Pacifico: Pacifico_400Regular,
    MontserratThin: Montserrat_100Thin,
    MontserratExtraLight: Montserrat_200ExtraLight,
    MontserratLight: Montserrat_300Light,
    MontserratRegular: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
    MontserratExtraBold: Montserrat_800ExtraBold,
    MontserratBlack: Montserrat_900Black,
    BarlowThin: Barlow_100Thin,
    BarlowThinItalic: Barlow_100Thin_Italic,
    BarlowExtraLight: Barlow_200ExtraLight,
    BarlowExtraLightItalic: Barlow_200ExtraLight_Italic,
    BarlowLight: Barlow_300Light,
    BarlowLightItalic: Barlow_300Light_Italic,
    BarlowRegular: Barlow_400Regular,
    BarlowRegularItalic: Barlow_400Regular_Italic,
    BarlowMedium: Barlow_500Medium,
    BarlowMediumItalic: Barlow_500Medium_Italic,
    BarlowSemiBold: Barlow_600SemiBold,
    BarlowSemiBoldItalic: Barlow_600SemiBold_Italic,
    BarlowBold: Barlow_700Bold,
    BarlowBoldItalic: Barlow_700Bold_Italic,
    BarlowExtraBold: Barlow_800ExtraBold,
    BarlowExtraBoldItalic: Barlow_800ExtraBold_Italic,
    BarlowBlack: Barlow_900Black,
    BarlowBlackItalic: Barlow_900Black_Italic,
    OpenSansLight: OpenSans_300Light,
    OpenSansLightItalic: OpenSans_300Light_Italic,
    OpenSansRegular: OpenSans_400Regular,
    OpenSansRegularItalic: OpenSans_400Regular_Italic,
    OpenSansMedium: OpenSans_500Medium,
    OpenSansMediumItalic: OpenSans_500Medium_Italic,
    OpenSansSemiBold: OpenSans_600SemiBold,
    OpenSansSemiBoldItalic: OpenSans_600SemiBold_Italic,
    OpenSansBold: OpenSans_700Bold,
    OpenSansBoldItalic: OpenSans_700Bold_Italic,
    OpenSansExtraBold: OpenSans_800ExtraBold,
    OpenSansExtraBoldItalic: OpenSans_800ExtraBold_Italic,
    PoppinsThin: Poppins_100Thin,
    PoppinsThinItalic: Poppins_100Thin_Italic,
    PoppinsExtraLight: Poppins_200ExtraLight,
    PoppinsExtraLightItalic: Poppins_200ExtraLight_Italic,
    PoppinsLight: Poppins_300Light,
    PoppinsLightItalic: Poppins_300Light_Italic,
    PoppinsRegular: Poppins_400Regular,
    PoppinsRegularItalic: Poppins_400Regular_Italic,
    PoppinsMedium: Poppins_500Medium,
    PoppinsMediumItalic: Poppins_500Medium_Italic,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsSemiBoldItalic: Poppins_600SemiBold_Italic,
    PoppinsBold: Poppins_700Bold,
    PoppinsBoldItalic: Poppins_700Bold_Italic,
    PoppinsExtraBold: Poppins_800ExtraBold,
    PoppinsExtraBoldItalic: Poppins_800ExtraBold_Italic,
    PoppinsBlack: Poppins_900Black,
    PoppinsBlackItalic: Poppins_900Black_Italic,
    QuicksandLight: Quicksand_300Light,
    QuicksandRegular: Quicksand_400Regular,
    QuicksandMedium: Quicksand_500Medium,
    QuicksandSemiBold: Quicksand_600SemiBold,
    QuicksandBold: Quicksand_700Bold,
    RobotoThin: Roboto_100Thin,
    RobotoThinItalic: Roboto_100Thin_Italic,
    RobotoLight: Roboto_300Light,
    RobotoLightItalic: Roboto_300Light_Italic,
    RobotoRegular: Roboto_400Regular,
    RobotoRegularItalic: Roboto_400Regular_Italic,
    RobotoMedium: Roboto_500Medium,
    RobotoMediumItalic: Roboto_500Medium_Italic,
    RobotoBold: Roboto_700Bold,
    RobotoBoldItalic: Roboto_700Bold_Italic,
    RobotoBlack: Roboto_900Black,
    RobotoBlackItalic: Roboto_900Black_Italic,
    SourceSans3ExtraLight: SourceSans3_200ExtraLight,
    SourceSans3ExtraLightItalic: SourceSans3_200ExtraLight_Italic,
    SourceSans3Light: SourceSans3_300Light,
    SourceSans3LightItalic: SourceSans3_300Light_Italic,
    SourceSans3Regular: SourceSans3_400Regular,
    SourceSans3RegularItalic: SourceSans3_400Regular_Italic,
    SourceSans3Medium: SourceSans3_500Medium,
    SourceSans3MediumItalic: SourceSans3_500Medium_Italic,
    SourceSans3SemiBold: SourceSans3_600SemiBold,
    SourceSans3SemiBoldItalic: SourceSans3_600SemiBold_Italic,
    SourceSans3Bold: SourceSans3_700Bold,
    SourceSans3BoldItalic: SourceSans3_700Bold_Italic,
    SourceSans3ExtraBold: SourceSans3_800ExtraBold,
    SourceSans3ExtraBoldItalic: SourceSans3_800ExtraBold_Italic,
    SourceSans3Black: SourceSans3_900Black,
    SourceSans3BlackItalic: SourceSans3_900Black_Italic,
    SpartanThin: Spartan_100Thin,
    SpartanExtraLight: Spartan_200ExtraLight,
    SpartanLight: Spartan_300Light,
    SpartanRegular: Spartan_400Regular,
    SpartanMedium: Spartan_500Medium,
    SpartanSemiBold: Spartan_600SemiBold,
    SpartanBold: Spartan_700Bold,
    SpartanExtraBold: Spartan_800ExtraBold,
    SpartanBlack: Spartan_900Black,
  });
};

export default useCustomFonts;

import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
// import useUser from "@/hooks/fetch/useUser";
// import useUserData from "@/hooks/useUserData";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import {
  fontSizes,
  IsAndroid,
  IsHaveNotch,
  IsIPAD,
} from "@/themes/app.constant";
import ThemeSwitcher from "@/components/common/theme.switcher";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { BlurView } from "expo-blur";
import { DarkGoldBackground, LightBackground } from "@/themes/theme.constants";

export default function ProfileScreen() {
  const { theme } = useTheme();
  // const { user, loader } = useUser();
  // const { name, email, avatar } = useUserData();

  const logoutHandler = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    router.push("/(routes)/onboarding");
  };

  return (
    <LinearGradient
      colors={theme.dark ? DarkGoldBackground : LightBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: theme.dark ? "#101010" : "#fff",
        },
      ]}
    >
      <BlurView
        intensity={theme.dark ? 70 : 80}
        style={[
          {
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
            overflow: "hidden",
            backgroundColor: "transparent",
          },
          styles.header,
        ]}
      >
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View>
              <ThemeSwitcher />
            </View>
          </View>
        </SafeAreaView>
      </BlurView>

      {/* Profile wrapper */}
      <BlurView
        intensity={theme.dark ? 70 : 80}
        style={[
          styles.profileWrapper,
          {
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
            overflow: "hidden",
            backgroundColor: "transparent",
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          {/* {avatar && (
            <Image source={{ uri: avatar }} style={styles.profileImage} />
          )} */}
          <View style={styles.profileSection}>
            <View>
              <Image
                source={{
                  uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFRUXGBcYFhcXFRcVFxYYGBUXGBgYFxUYHSggGBolGxUVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtKzUtLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPsAyQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EAD0QAAEDAgQDBgUCBQIGAwAAAAEAAhEDIQQSMUEFUWETInGBkaEyscHR8AYUI0JS4fEzchVTYpKisgckRP/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFAAb/xAAyEQACAgEEAAMGBgAHAAAAAAAAAQIRAwQSITETQVEFImFxkfAUMoGhsdEGIyRDweHx/9oADAMBAAIRAxEAPwD5pUzLzA5dc481FhPNXTL8gmi13Io6lSfyPql7ah5lEMqnmfVMi0Vsib9AvI8/5UcrvwqkE81a1pKMQ1RfSJR9BpS6kExoJkSrmNLwMiPNOcqzXBXkOIWkDpVm+EYWaNZGLMa6HtlFUnAITjLJHvyS7D1jIvInx90W7yIjic4Jo01J6hiHrlB2i7Wao8wLbgJcJj/4hGxT/D1LQspxClkfI8U6wGKloIUNbuCzxBqa6LsZS1CxWMp5HkLb1qhdss5x7Bz326jXwUNPaO084xycdMTlyY4Hi5ZY3CTOeqnVoSd9Gi8KmuTV4jjTS2wKyPEyS4uO6IbiUNiDMoZytB4MWyVi55S7EG6NqvQNdU8htYEUhy7nVJK5mSbLW0fFg5n0VRI2n7oitSMdEOWBWWjPi0yyjHVWscOqqomEawN2RRQvI6Z2iEUxVtjYqTW9U1KipN2XUQjaQQ1Cn1R1On1RxRVyyGHCnAOM8lbx/jvYsBY5snrJAg3jbRJ+IvLaZjctB8C4A+yyfGi7tHk7NEb2JaR7T7pWo1LxpRXZZ9neyo6mTzTfC8vUa1q9StVg1HP5kC1xp7qp1I6NNryZkAtHe8QPGEG2pnYGgZiCLTGdxk5nEaNbH/koUuLVMpDqgkQGQBAE/DkDYg66jndZfizbuz1C0mGMaSHGE43UoktFSOTTJgRNumq13AePdscr8s/ykb9D1XzZmIEuJALyDE2aCDt1ibHnujeD1jTqMmxcTYc7R9Fo6bUN8SML2j7MxuLcVybrjXxDzVPC6+V0bFW46qKlNrxeUua+CDyWg3TPNY4Xj2s11KEJjqdip4GsHBWYltih6kFGpYq80fPuIDK4jqgX1fBOeO0ofPNJKh6Kvk4ZsadqUEzzKysNdDdpfRTFYHUJdlhx+BTiY1hLqt0yqVRuEIYM2Spqy1hdC6qxVJi+n0VPZf8ASkuBbWRD7E1SbDRAvBR+IpwbINwViXZnY6S4KCSrmAkKDl6m5Chr5QXSBV9MFCMcUTRJTUytNMPohH0UBSKNpEpqKGUo47VLaYi0uHnF/mAkFWo7EENptlxAbpy2Tvjod2WYG7SD5Hun5hNP/jTg4e0VzGpGugBj6LL9oy2vcel/w/FTxuF+fIvwX/x/Vy5n1MhI25clzj36bFBgq0nS9kHx3PvC+rYnBUHa1vEZgEi4vwrDZDDw6ZuXwOV7rJWonfJ6T8NiapJnyGtxEwS9gLjAnTLBJka8+ar/AHQgEXi/gT18vyE14nwfI2oQQ4NI0INudvJI8HU72UXa43B0WzjT4l6nnc0k7ivJ8n0r9PVBUw0HW0+bR9kLVGq7+j6gLakfCCGjwA+5KliR3j4rXTuCZ4ya26iaJ4TFlngmDuKAjdJSVJrl24iWNPkE4pUzmUpqtTjFNS2qkz5NHTulSAXNVdSAiKpQFVIlwX8asi+oh3vU3N6hRNMf1JLtluKSImqYUe2KkWiNfZQgc1HIao0lViBqtTSu2EFVCsSiZuOYC4LzQr6gCi5sIKLG4lTCKpFCter6b0SEzQwpOR1IpZRejqT06LKGWITWpB7XNOjgQk4wlenhqeScjTUa7LMAis+5A8vROKblLBcWNFxZByBxJFtHQ6fUuVL2kv8AKUkrpmv/AIdl/qHjbpNCj9P4evWrsoio6HmC4zAJ87jRLsfRrCo4FzrEiR0Pptot1w/ieHo124h/dEkUxlkOcO8b7GI9+SUVeKUquIJoBwdclpADCAJ13NllYmpXKj1epUobcd3fmI8Hw2qXAmWgnVwAkfVB8ewradYtpiBEiNN5TviOMdUf/THlEBIMdje9mImB73ifAxI3WrgaeHlHntXFrVVF2qH/AOlsTALByjXyn2TeqsdwKoQ8FomOu8LWvfMReVewzuB57XYdua/Ug8qvtEY3hryJJDR1N/QeCpfg2/8AM/8AH53sjXPRXqu/4YNVqWSuubpnjsG9gk3b/ULjz5HxSqqUud9Mt4Eu0UOQ1VoJV9UoR7kiRfxorc0KDmhScjnRTZEw+JJ3BMQ0HbXZKlJJWy1CLk6QuqUCACQRPP7KrIFZTLCCP55Jnn09JUMqBOxrW10batRaeaVV6UFPMWQ3bVJcSZK0ciR5/TNv5C4i6kTIK6/VQxBiAq/Ro9lYcr6T0HKtpvQJhyjwM6T0VSeheG0DVqMpggZjEnQCJJPgAVvuH/pmnTaHsiu6Rd3dZZ1xAmJg3ueULsmohi/MKho8md1BGWp1EHxXEdm5lUci09RqPqtpxz9sX1M7w5zG5QIfnDjJaA/PlgZgLtJsehWJ4kM1Jw5X9BdQssdRifBP4eeh1MHf0+nImxHGKlduRxGQcxYfZCis6me49p8CT7kKql3JnTb5/ZeqYlp5CwGmt1nqNcI9C57lb7C63FXPbaZ0lU07mDBtffZBtfF7Af5V2BqPaczWh0mBmmT1tsrSntRT8PdIZ4ehlMtOWdALfnon2EqVJY1xc4GTJ0y7i3jsk7jVJMdm2LZg0k+5j5o/A0xSZmcS5zxcuuSJtHIdPFVp6mSVJ9mri9n4slSceubf2zSniFottfwG3OIHLXokWKxsH8/Oi4HEOi/9ov09eiScRxEGFOnyuL4Kev0kZJbkOaPFXttndHRxCKL2VfjaeWYa+puT4mFk21id9ldTxDv6on2EXPur0dW1xLlGRP2bB8w4YyxfCng92HDYkhvqCdfCVBnCAPjf5Cw/7nfZXcPxYafhBJt3hJAnSeepJ5noi8VhBVPce5nj3x8wR6lHKMsivHQmE44XtzX811/f0F761Kl/ptEzE3J63N/RJuJ1SXzH9zP3KMxPDqtElzgHjZzTmEddx5oDDPz1mzeCPVUZqUX7xq4njnFPHVMrZhXtLS4AXBudj0Cs7PqnHFcvbbAfYSkHapmF3GwM8alSN1jqpOqW1WgpjimpXiFpTPO4FxSKahAQT3gnRXVEO9IkzQhGiLiOS61w5Kp5XGuS7HbeA7D1oc2JF49bfVbLhfGXNhoMsI7zZgzvB21WCL7J9+2eGCsAcs+kgH6qpq0nG2XvZzcclIjxc/8A2A9s5HSRLiSCNQetxfxQ3EyXZKDdXnvxyG3gNx9gqcTxFsZnEw17TbXQg/NQwv8AFque2HDITBIkajQkGe8Oqly2Y6j6BPE8mfdPmm0v7/f9gHi+GyukGxAtvoNj4iyUvW44zge1NQNBPZkDbdrfqfZZ7D8EqPdlAVaGVVyXpYHxS7FdGm57g1tybD5LT0cKGODI/wBNonnJufeEx4fwtuHeGunPY6AjnDpOkfO66ymC+obZcxk7AWj2jxS55b66H4tNt5fZ2jhmhpdVJDAZMak3sAd/zqhmudXq5vhbrGwA2HSFCpX7d7WNtTbtGp5nr8pV+NrZGwDzvpbra6XJ1XqaGkTmpJOkl9SupUGc32P+I8R7BIuIu7xB5lWYfFEv/J+3JCYp0n8/PzqrWGO0zNdmeWVvsrbVtCIZU5/kmfll9Sgahgz6rgr3nn7JrRSi+B1Rrjz3TBmJgS52Vo/PPVZttdWNrSZJsPb+6KM5LoXkwwmveRqW8UgTcchv6DU9FCk2jqRTa4mbNAynqWgX8THRIcK4vl3P5cve56pqyGt+IW0AjTwhW46hS92XJnS0E8a3Y7XyKuJ4Uh4LTmB0PVKv2j+SYVMcQMrNeRJ+uqH/AHdX/lf+yCUIp+6NhLI17/f6GwxBCU1wmuIS+s1XZ8mJg4F76aHqUke9iicPzlJcbLsclCx1DqoigmxwrbXVZw/JC8YazpgNGhJEreccdTZhGMp1O9AkDw3OizHDOFvqvhsQ0Zna2aCPumuLw3cII0JAWbrWrUTf9kQb3T+FGTY0DMXXggAe5+nujP06Wio6P5so1gmXgkCR0O4hLuJPylw2n6f2CL4A5oqA95wBMQ3vGGOJtcxt5hQ/yBf7tDzhPFQzE1GvPce8gnl3iAY5QT+BPcVVoUydC9s52td/TcjKL3uB1IWI4bR7Wo1uYAvMS4gAE7knQdVum4TDuAplze2DmNfVBLs/ZGk4iBMjusFhv4zRzQjus1NPmko0hF+o657USSSQ07jM4zmLZFhmL/DRBVnZaZBN3HMY38I2k7c17GV+0rPLi6WhtjcjNLrchBELoo9o5oZN/iJgTv4fdGlSQDfLoswDBTZmKT4+uaphpAjUfZMOP4oNAos1OqSVcS2mIAl3yRxi37wPiRj7j68y6gwUvi1M67CB9VQWFwJ89PL88OiFqVXOIm/Lz6JvWinTDT8Ru7pyHp81agvUoamSb91UhQWTZDGkUXrKpLk2ipbKASFY98wBp9eai8yoQoDTG+CNgIJ/6QYknbyCd0+ClzczqhaeTbgeJdr5QlXBRvvYeAgH3n5LQvrQ1VZOW6kaC2+HcujP4nh7hJ1E2dy8RsV2XJq+oMkHcFI+yrfkLZa2Uebx5HkvdRtH0nkfC70KAraqX7xxMZj6lRxQ1dNzeOpR7k0Z/huEqYM/VHU6lPLLnCRt/ZK+0Kpe+6hToZLFvGZxjNh7Kp+Ob/SgDVhX4ahmBcXRB0+6ne30d4MI8s0X6VxgbiOyNs7XNd1dEj0gjzKo4rXLHOY43BP+Vnm4lwc59g9rmuBHOfYzBWi4o+jiXNrGp2bXMBqEtBDXAwZuOugJtpdYurV5dx63QLw8CS9DIcQp5szt2gHyzBp/9h7o79MHK9wm5LgAQMoBZqTPTppqFa+lRJeKVXOCyowHKQe8ww4iLNzRfwV2FphrY/lsTsahG55N1t1U3caDw4fEyWd4bg2NyvcILYgh/dJbvBBJM8jCYv4iZ7tid7Tf3QFarufIaADkBsEIa6RKmzbhhhBdItoYmDYCZmYBk6d6ZzWtfTZFv4qykxx3iNL/AOPNKDUAdCji62Xva7eKYsakVM0YK64Yqq41z3FwBL3eceAXaWBdcvIb4lO8IGlst7s6gIXFU6ebvW8dTF9d0yVrpGfDFy3L/oDdiKdPTvOGmwCDrYhzzJTClRpC93H2sh69Zs2CKBW1Dt2D02E9FEq3MfJU0xKaVTkLsKYZ9URhsNmdcwBHiegCi0uQlFyaSGfCGHLmdv8AIWCKrV58FDEUHNaHMzg7yZBHjFkE+uL2I8UOmSlPcwtbJxxrHH9SeIxMX5f4VH/FG8nISvXMFo3I9tEPB/P8KzPM0+Cnj00XHk17qsaD6fnqrcNV5kdbQP7pa2vb6fZep14t+aJW9x6DeGE17w8ocMpm5cb8iPspHAYcbE+Lj9ISf9/ANx0QdTHk6EqXlm+gI6XGlz/JojQpDSm3zv8AOVBlVl+62ByAHyWbGMI3PqicDiXvLgAT3TYDmQPqoWSd9jHpsVcR5B8Q8SfsOaoruzGGTDiO71tcdVKuHZiJvyjTYTKYcHoAfxX3GjRAk8/tPKUuTV2XsUJqOxdMvwmBbTZJ0OvOoRsOTB7/ACtc/cr1WsXGT5cgOQQmIq2SJy3M2dPBYonK9ZBipdQr1FU50BAkHPLbL8TUuHeSpxT8zTHio1TLSEPRenYypmnb+YRhMUWnpuOaPeQ4aBzeREwkYdCvo4gjRPKiyVwHmgP5S0dMo+ahiafd7oBO82XG1gdLHkpdpKlRRGRxkqF1R7sp7sDT1+iHY6Amf7aXS287bf4XafCwDLyLaDb13QTaiVIQbdUW4DCNDc1VpJOjZ0HMj6I+ljKbbBuXnYfRDPq9UFWqgmEinLstblD8pocS6Gk5iB4wkWKu0ztoef23TOjVaaQLzIMxf0B5pNicRnkRAgxA3TcHCaKmqVzTA3mAq5K45xgKEomdHobDEQoPq7qtwUsI258PqEVWxTdKyYebSu1asaK2s2yAcUTVC4ycw3AuDnd7QCT15D3WjwmNAbYAD+kCB6LIUn7c05PDyGOcHEHkdHfZIyv4lzDBc8WMsaWVCQYMC7xqOgO42VD6mgFgBAHIKGBwFQtENN7kmw9TZFUKdFjh2rw4TcNPdHi7fyQSa6RoaeHhrdJ8+nogVzkFXqLR47hdN4zUDB1ykyCOh/AspjZaSCIPyUJD/GTXBAGSu1CuUxZRcfNCcnwcBQ05XIhrrqGNZYFMjwxGRXG15FNU3Xg4AKL3WVIKaipKXIRTfBlH4VpdPil9NqY4Gr3bG8rnJpENcDJtHKwlv90pxeKOhOml0U7FwwpIASlpW7YLdKi01XHSVEsOnqjKJbeLd1CvmdEfwA+JdUrEgM/lGy9hmgkydLqqm2JJ2C92giBqfi+y5fAiXqyquL2v159VBFV6MXGm87IfKOfspfZEaa4GJZ5lWNhtpjwVbnz5KNIga/dDbOpVTDIH5CrOGa64IHrr4gIcYjX67qQxx2R75C/BiurLKWA7w7242T2lUDHgOBqH+Vgj1M6DqlXDKpc++gH1/wApxgaYJNTeMvvJj2HkVXyy55LumhwW1W1Kp/iOhuzG6eZ3Xa/BqWUkiDzko2kyEBxPFxYJKbbLMq6EdPE1KDu6bckRiKzMSAfhePfoUHjaoISwVS0yDBVhK0V9+1jF9FzTBBnYc/Dmm9LgFM0wXYgiqbmkyiagaDpmqZgM3SPNWfpXGivUZRcAXE2mNgT9ExwAPZUy0tl5AgzEl0SSLgyfTxVXNNxdL77/AKNLTxWRW+hQf060n/WdHPsrgeAf4bofGcFsRTqZz/LLCzN01MFaSs9wOXtqB71wDV+KSLENAFzqIQ7nueypm1BMgA5bZpMTa/ySo5p939/Qc8OJ2kn9b/4RgqjCJBEEWIKqphNuPN/ik7EN9xKUhhkwCQNY28VoxlaTMbJDaywu2C7ReQbea847LoGUSifJCR2u6VyiqmOmVOiuQmfPQVhw4uygC4OvJFHA1By9UAyvldPkjxxP8hLnu8huPbXJQ7DmSHRMEwCfdC5YemGGdmc46yIHk0z7whqlKSfzmphdgZaUbI1HQPHQc+qHursZsOSHv1TZdicfQQ567TfNio5V1jbhcQ+iwU7mbdFIUBzKhiXHMfGfW6gzMSALk7IuEB7zXY74JSEkN1PsButHTYBAGg/JQHCMJ2bADr/MfOYRWJxIYFQyS3SdGtig4QSfZzG4kNCzeLxC9j8cSUsq1U3HAVkmlwjteshjzXRcp5+neFMrOcH5oaAe6QLkxBtpqmTkoRtgYsUsstqAuAYwUcRTquMBuaY6scPmU+wvGaTS00aNatkIIzOAEiI+BkctSjMJwmh2tNzaUA98ZsxkFu4cdQSPBdwr8tMODDDqtUw1puM1TLEaaNuqOXJCbun9a9TUwafLiVbqv0/T+ynh/DGVKpxNdopiTVpskkvqOdmay2jRMmdmoui8ltV5MudUggSPidBhvKXc9Ar6OHDyyo3O3V2WoSIm3waDWw2toqBxIAA1GhvfIN+6A2S12Z0AgwD5pLm5df8Ahax4Y4/Pv9/tlOOwDH06n8KHNLGB97yGgFt7gZhJ3M+I9xnCkYOsA0BrQwt5wCwkkevohaHHc1YPcXVKbC7s2MiATLQ4kwdCTJ5pXX45VAr0zDhVLpLiTlDtm3iPkmRxZbXwp/f35ip6jBTrzTX7P+/2sS0yqqr5XCdlErSMJy8iVFWssoYfVX1GQovk7bcbKqpUHAWXXrjtvBEAM+HuOWBa5n05r1d4Fr+qhgnkNiJ8TZU1jeY+qGDpsnLFNIqq6rl1PNZQlGAFhq4ArGKzDYV1R2Vgk+w8TsuugUr6KK7ZcI1IH2T/AIRwrJ33/HsP6f7ovBcPZTvZz/6uX+0fVSxWKDVXy5d3ES5p8GzmXZZXrhgWex+MndQxmNJOqhgMA6qbWA1dy+5Qwx1yxk8t+7ECqOQ7imnFqTGPhmjQBzk7n39ksVmPVlSXdFtILV/pIllLEVQJhoA5S1rnX9Qsq0I3hZ7/AHnHI2XkSYkWFtJ0Ss+PfDaXdNl8KSl8/wCDRYTiRbWzVc9V7gW02tDRAkEmCQADEk9OgXamOr1ak0GZWNlt4d8ZF+6BAEczzQPBqofVf2hDBWa6mxxE5XAZmt8DAaecpthnNezJnFNzQ4QCIc4EgyLEuMxE7BUcsIxl19/I0MGSeSDW7z/X69i6h2zs9V1ZwptEOcAO8TcNYALc7fVZTEse95cWOvzaZ87ar6ZS4ZUYxwY+o6A7KGHVwY55GUTu2PFw8FRVD2Eg4p4LSYaXEEiJBbu5pkgOiLTCmGXY20l9/oLzad5eN38s+cinUZ3oe3rBHurqdeRB1/Pdav8AWXEHjCUKLnuc6q91d2Z0uDBLKYPQ3csVCu4pvJHc1Rm5YeFNwu6O1xfxVRRVWiTCrbQP4EwQ3b4IYY94I2s0m6ppYV0zBRfZn23slvsdH8jTAKjVJtK6m5l/7K+kyOidVlVyojTJiAR5wvO8vT7KRqQqjW5LlGjpScjjmqqFcDIUIUkJjbAYAv6N58/BPKFNtNsNtz5nxUgYQ9d6qzk5MvYsagidTFiElx2Jk2XHulxlC1nI4QSAyZeKRWDcDmtFgaobQsYJc7ygBZpvxDxCa1HHsSNs4n/t/simrIxSqLYtxT5MqpjVJ4umGAoN1IzHroPujuhUVyUYbCOdfRvM6eXNMm4UWY2w+JzjrA3P2R1PDTc6bzYBBY+vYtboT6gaeWpQXbLC4AMbUzHu2a2zOkb+JN0xw/6ry/HhcPVJ1c9hLifEPCDw+Ce+S0TGtwNfFEVKFYjLkbemKeonKH5gRLrGWx4KJ44z7OWWUFcS+p+sGH/8WGHQUz9Xqp36rbBjC0R4NJjzLlTXfXFQEsYCaoqgWgupjSM3w3u30hdaMQHhwpszZ6lUaa1QGutm+GwgbJf4bH9tnLWZfUVcSxprPL3ACwAA0AGw85QzQiq/D6jGy5sC15B+R6hDgKxGKSpFdybbbL8U/RVfuDzKjW28FSQuaIUqCP3TuasGLdzCDAVgCjaTvZb255qJqzzXWMuoPamCqVnTUJUWPhcC8GqLCpFkWXV1jbKXZKaBsdMxjhrcKGIxJiyrqDZOcB+ksTVptqNDMjgCCXHQmBZrTG9uiW4rsNZJdGcJKk2kCEZxLh5o1X0iQS0xImDIBkTfQrjadgufRC7AX0k1wrZZUZ4OHlb6oOrSReFs5s6Gx8DZQx2PzQtqUt0XgKzWzNzoArKlMdoQPyEO+lBJFst/PYInygE6kMqtaP8AUOY7MHwt8eZ6IB7pMlVU5Kc0OGtNJtV7K7aejqgpl1MHtGtMOygAZcxmTBEXNiPCHbrQrBXmVgCS4ZrRqRHVPKvBA2JZiBnZNOaLxnflcSBLLizdNjOiqPBml+T+NIJLh2NTNkJcGkN7OdMkzaZhSpIXJuhK/FM/5Q1P8x3202VOLxDXCGsymZnMTaNNE3w3BmuNQObiAWPcDlovdDe4Wl4yWJBd7GFChwVrqQrObiOzLR320nubn7oyg9nljNmaO8ZgXGim4iVZnnE8z6qELWn9MNztplmLzua5wb+3qZiA8AEMNOSMpudiRPJB/wDB6WZ7ZrzSbUdVHY1AacEZC8dnLW5ScxdFxyXb0FTM84aKDmoykzSQuVqPJHVgOVMGAsuNZKL7EBoPMlcb7fnqhZK5KyyF54V8fmqjSZLgPE+xU3wR5g5auNCKxGHLWsdzH57I136erCj28N7PKHT3pggH+mJgjdRuSGRxzle1XXYuzWXpUCuIrFUOXiTK0PCcezs2MfGZgcGZnFjRJN5FtHb/ANO1ikTVaAuaFxk7su4u8VK76mcunLLiILiGNa50dXAnz2UadIkC6gAjKYvG390ElwNg+QGtRMayohtgr69QzEqA0CihuOXvFj6BzZ+Yzeuv1QnEKeV0bG/numlX/Qb4O+blGuwGlcaCyiyaEjbLYYf9R0m0mnLUNUYX9rkOXsCM+btCZzZo2y67rKuCspNlTKKfYS44NdxD9W4d9QPFOpJqvqOIp0mFodQdSyS1/wDGOYg53QQAAl2E49RY0U4quY2m5gc9rHuJfUDzLS6MoywBO6RPYOSochWKLBk5Jjl/GKDg1pNdgp1HvYaQYwuzgSCM3ccCCARNky4R+q6FCnTy/uXVm5S8vyVA5rXh4ose6p/DpSP5WSTeNljQvFM8KNUIWR2bSl+qMGB2bm4upTL69Ug5BndWcCKb2trDPSESQT3jFgFNn60okYhr6NSoKzKgfULmU6lZz2BrRUY2QxjW9wFrjAExJKx9NohVVRdR4MSXml5FWisqCVEhcYU1cCXyrOVHbdAuNaukd4ohjbIZIZB8FDQpYSl3z/td8l6uFZhP5v8AY75Lq4Ob5s0PEa9NuCfROriCJzFocHUnAgZbOy0qjeR7QToqK3H6RwQoS7OKYaBFsxbTa7bT+G287IHiziadKdxJ9B90lQPEmkOw6qePdt800QheUl6EdCrP/9k=",
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileTextContainer}>
              <Text
                style={[
                  styles.profileName,
                  {
                    color: theme.dark ? "#fff" : "#000",
                  },
                ]}
              >
                Naveen
              </Text>
              <Text style={styles.profileTitle}>naveen@gmail.com</Text>
            </View>
            <View style={styles.membershipBadge}>
              <FontAwesome5 name="crown" size={14} color="#FFD700" />
              <Text style={styles.membershipStatus}>Premium Member</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.statsContainer}>
          <LinearGradient
            style={styles.statBox}
            colors={["#95dd22", "#95dd22"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </LinearGradient>
          <LinearGradient
            style={styles.statBox}
            colors={["#95dd22", "#95dd22"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </LinearGradient>
        </View> */}
      </BlurView>

      {/* Profile options */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: scale(20) }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <Feather
                name="book-open"
                size={scale(21)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Enrolled Courses
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore your all enrolled courses
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialIcons
                name="leaderboard"
                size={scale(23)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Course Leaderboard
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Let's see your position in Leaderboard
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/my-tickets")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={scale(22)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                My Tickets
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore your all support tickets
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/support-center")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <FontAwesome
                name="support"
                size={scale(22)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Support Center
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore our fastest support center
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/notification")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <Ionicons
                name="notifications"
                size={scale(22)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Notifications
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore the important notifications
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/settings")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <Ionicons
                name="settings-sharp"
                size={scale(23)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Settings
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Control the app as per your preferences
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={async () => await WebBrowser.openBrowserAsync("")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialIcons
                name="policy"
                size={scale(23)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Privacy & Policy
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore our privacy and policy
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: theme.dark ? verticalScale(90) : verticalScale(30),
          }}
          onPress={() => logoutHandler()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialIcons
                name="logout"
                size={scale(23)}
                color={theme.dark ? "#fff" : "#95dd22"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Log Out
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Logging out from your account
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4a90e2",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  membershipStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 6,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFF",
  },
  container: {
    flex: 1,
  },
  header: {
    height: verticalScale(180),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(20),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSizes.FONT28,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  profileWrapper: {
    width: scale(320),
    backgroundColor: "#fff",
    height: IsAndroid
      ? verticalScale(155)
      : !IsHaveNotch
      ? verticalScale(175)
      : IsIPAD
      ? verticalScale(185)
      : verticalScale(155),
    marginTop: verticalScale(-90),
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(15),
    zIndex: 10,
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(10),
  },
  profileTextContainer: {
    // marginBottom: verticalScale(10),
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    // marginLeft: scale(10),
  },
  profileName: {
    fontSize: fontSizes.FONT22,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  profileTitle: {
    textAlign: "center",
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#8a8a8a",
    width: scale(230),
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(10),
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(120),
    height: verticalScale(62),
    borderRadius: scale(10),
    color: "#fff",
  },
  statNumber: {
    fontSize: fontSizes.FONT25,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontWeight: 600,
  },
  statLabel: {
    fontSize: fontSizes.FONT20,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontWeight: 600,
  },
});

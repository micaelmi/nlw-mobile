import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);
  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Discord Copiado!",
      "Agora você pode colar o nome do usuário no seu discord para se conectar com ele"
    );
    setIsCopying(false);
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <MaterialIcons
            name="check-circle-outline"
            size={72}
            color={THEME.COLORS.SUCCESS}
          />
          <Heading
            title="Let's Play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

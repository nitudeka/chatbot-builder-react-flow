import { IconMessage } from "@tabler/icons-react";
import { v4 } from "uuid";

const components: any[] = [
  {
    id: v4(),
    message: "",
    type: "message",
    label: "Message",
    icon: IconMessage,
  },
];

export default components;


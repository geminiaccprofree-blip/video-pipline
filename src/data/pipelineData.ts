import { Lightbulb, FileText, Mic, Video, Wand2, Image as ImageIcon } from "lucide-react";

export type TimelineItem = {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: any;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
};

export const pipelinePhases: TimelineItem[] = [
  {
    id: 1,
    title: "Idea Generator",
    date: "Phase 01",
    content: "Generate 5 high-retention viral finance ideas based on strategic inputs.",
    category: "Strategy",
    icon: Lightbulb,
    relatedIds: [2],
    status: "in-progress",
    energy: 100,
  },
  {
    id: 2,
    title: "Script Structure",
    date: "Phase 02",
    content: "Select a narrative frame and build the structural foundation of the script.",
    category: "Writing",
    icon: FileText,
    relatedIds: [1, 3],
    status: "pending",
    energy: 85,
  },
  {
    id: 3,
    title: "Voiceover Script",
    date: "Phase 03",
    content: "Write the word-for-word script with strict pacing and compliance rules.",
    category: "Writing",
    icon: Mic,
    relatedIds: [2, 4],
    status: "pending",
    energy: 70,
  },
  {
    id: 4,
    title: "Visual Direction",
    date: "Phase 04",
    content: "Plan cinematic shots, lighting, and dynamic camera movements.",
    category: "Production",
    icon: Video,
    relatedIds: [3, 5],
    status: "pending",
    energy: 55,
  },
  {
    id: 5,
    title: "Veo 3 Prompts",
    date: "Phase 05",
    content: "Generate high-end AI video prompts with professional cinematic modifiers.",
    category: "AI Generation",
    icon: Wand2,
    relatedIds: [4, 6],
    status: "pending",
    energy: 40,
  },
  {
    id: 6,
    title: "Nano Frames",
    date: "Phase 06",
    content: "Create 8K still frame prompts for seamless looping and visual consistency.",
    category: "AI Generation",
    icon: ImageIcon,
    relatedIds: [5],
    status: "pending",
    energy: 25,
  },
];

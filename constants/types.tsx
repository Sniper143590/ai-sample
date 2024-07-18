export interface PresetButton {
    _id: number;
    text: string;
    prompt: string;
}

export interface ChatModule {
  _id:string;
  avatar:string;
  llm_name:string;
  name:string;
  placeholder_text:string;
  preset_buttons:PresetButton[];
  prompt_context:string;
}
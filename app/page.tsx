"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, Send, Plus, Mic, User, ChevronDown } from "lucide-react";
import { useChatStore } from "@/lib/chat-store";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  pdf?: File;
}

// Sidebar data
const sidebarData = {
  navMain: [
    {
      title: "Chat Models",
      items: [
        {
          title: "Llama 3.2",
          url: "#",
          model: "llama"
        },
        {
          title: "Gemma 3",
          url: "#",
          model: "gemma"
        },
        {
          title: "Qwen/Qwen3-4B-Thinking",
          url: "#",
          model: "qwen"
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          title: "PDF Analysis",
          url: "#",
        },
        {
          title: "Legal Document Review",
          url: "#",
        },
        {
          title: "Case Analysis",
          url: "#",
        },
      ],
    },
  ],
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">PlaceholderAI</span>
            <span className="text-xs text-muted-foreground">Legal LLM</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState("qwen");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingContent, setThinkingContent] = useState("");
  const [completedThinking, setCompletedThinking] = useState("");
  const [thinkingExpanded, setThinkingExpanded] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when thinking content updates
  useEffect(() => {
    if (thinkingContent && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [thinkingContent]);

  const storeState = useChatStore();

  const messages = useMemo(() => {
    return storeState.messages[selectedModel] || [];
  }, [storeState.messages, selectedModel]);

  const { addMessage, clearMessages } = storeState;

  const models = [
    { value: "llama", label: "Llama 3.2" },
    { value: "gemma", label: "Gemma 3" },
    { value: "qwen", label: "Qwen/Qwen3-4B-Thinking-2507" },
  ];

  const handleModelChange = (newModel: string) => {
    // Clear messages when switching to gemma or qwen
    if (newModel === "gemma" || newModel === "qwen") {
      clearMessages(newModel);
    }
    setSelectedModel(newModel);
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPdf(file);
    }
  };

  const responses = {
    qwen: "Terdakwa (nomor telepon: 085222223415) berlokasi di daerah Cianjur. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG.  ",
    gemma: "Berikut daftar nama TerDakwanya yaitu:\n*   Ichа Bintі UbеAd\n*    Sriуono Als Kopral Bin Putri Sujiyanto\n*     Hari уano Bin Delijo\n*      Мiftahur Rijali Bin Abrori\n\n\n**Catatan:** Analisa lebih lanjut dapat dilakukan mengenai peran masing-masing terdakwa sesuai konteksi keseluruhan isi dokumen.",
    llama: "[INPUT] Terdakwa I FAUZI bin MAKRUP: Mengakui diajak oleh saksi Rasimin untuk membantu memantau lokasi pemberangkatan PMI ilegal. Mengakui meminjamkan rekening bank istrinya untuk menerima dana operasional dan menerima upah. Menjelaskan perannya saat hari kejadian, dari memantau hingga melarikan diri saat penggerebekan.\n\n[OUTPUT]\nTerdakwa I FAUZI bin MAKRUP\n\n\n[INPUT] Terdakwa II JARI bin DJUMANGIN: Mengakui diajak Terdakwa I untuk ikut membantu memantau lokasi. Menjelaskan perannya yang sama dengan Terdakwa I d...\n\n[OUTPUT]\nTerdakwa II JARI bin DJUMANGIN\n\n\n[INPUT] Terdakwa mengakui perbuatannya. Ia kenal Anak Saksi dan telah 6 kali menawarkan jasa BO kepada tamu. Ia menawarkan tarif Rp. 1.200.000 dan akan mengambil keuntungan. Terdakwa juga menawarkan jasa perempuan lain selain Anak Saksi. Keuntungan yang didapat digunakan untuk kebutuhan sehari-hari.\n\n[OUTPUT]\nTerdakwa"
  };

  const fullResponse = responses[selectedModel as keyof typeof responses];

  const thinkingContentText = `
Okay, let's tackle this problem step by step. The user wants me to act as a legal expert who extracts the "Terdakwa" part from given court documents. Let me first understand what exactly they need.

First, looking at the instructions: analyze all document chunks provided, identify where "Terdakwa" appears, use RAG DB examples if relevant, extract clean structured content following their example formats, ensure accuracy with minimal changes except fixing typos/punctuation but preserving original text as much as possible for metrics like ROUGE and BLEU scores.

The context has four document chunks labeled Chunk 1 through 4. Each chunk seems to contain parts of a criminal case judgment related to someone named Terdakwa (which translates to "accused" or "defendant" in Indonesian). My job is to find mentions of "Terdakwa" across these chunks and structure them properly based on the sample databases.

Let me go through each chunk one by one.

**Starting with Chunk 1:**

In Chunk 1, I see several references to "TERDAKWA". For instance: "...didiaerah CIANJUR," ... "dan dikasih lagi uang fee..." followed by "Terdakwa".

Wait, here's a line that says: "dikasih lagi uang fee sebesar Rp. 4.000.000,... untuk d iantar ke rumahnya TERDAKWA didaerah CIANJUR"

So here, "TERDAKWA" is mentioned with some spacing issues ("TERDAKWA didaerah"). Also later in Chunk 1: "Saksi SANTI SUSANTI BINTI UU BABAN IING", etc., but not sure about other instances.

Another mention might be in another sentence? Wait, maybe also in Chunk 4?

Looking further into Chunk 1: There are lines mentioning names like "sdra. UNANG", "ENDI", but no direct "Terdakwa" name yet.

**Moving to Chunk 2:**

Here we have more details. In Chunk 2: "Saksi SANTI SUSANTI BINTI UBAN IING...", then towards the end: "Saksi SANTI SUSANTI BINTI UBAN IING dan ENI berangkat ke Jakarta..."

But wait, in Chunk 2, near the bottom: "Saksi SANTI SUSANTI BINTI UBAN IING dan ENI berangkat ke Jakarta..." Hmm, perhaps not directly naming Terdakwa here.

Wait, actually, in Chunk 2, look again: "Saksi SANTI SUSANTI BINTI UBAN IING dan ENI berangkat ke Jakarta..." No explicit Terdakwa here.

**Check Chunk 3:**

Chunk 3 starts talking about "Terdakwa": "- Bahwa maksud Terdakwa memberikan bayaran kepada Sdr. YENI Binti PARMAN DODO." Here, "Terdakwa" is used without being specified as a person—just referred to as "Terdakwa".

Also: "- Bahwa tujuan Terdakwa memberangkatkan Sdr. YENI Binti PARMAN DODO..." Again, using "Terdakwa" generically.

**Then in Chunk 4:**

This chunk has multiple entries. Looking closely:
"- Bahwa Orang suruhan TERDAKWA terslebut datang kerumah sekira akhir bulan september atau awal bulan oktober 2022 dan memberitahukan bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022 dan yang menyiapkanp tiket, paspor dan dokumen keberangkatan lainnya adalah TERDAKWA melalui sdr. UNANG."

Ah! This clearly states "TERDAKWA" twice here. It says "Orang suruhan TERDAKWA terslebut" which means "the agent/servant of the accused said he would take him away on October 6th, and the ticket preparation was done by TERDAKWA via Mr. UNANG."

Additionally, in Chunk 4: "SKSI SANTI SUSANTI BINTI UBAN IING... diberangkatkan ke rumah TERDAKWA (085222223415)" — here, "rumah TERDAKWA" refers to the defendant's house, identified by phone number "(085222223415)". But note that the term "Terdakwa" itself isn't spelled out; instead, it's written as "TERDAKWA" with capital letters possibly due to formatting errors.

Similarly, earlier in Chunk 4: "SAXSI SANTI SUSANTI BINTI UBAN IING... diberangkatkan ke rumah TERDAKWA (085222223415)..."

Hmm, interesting point. The system instruction says to preserve original text as much as possible except type and punctuations. However, when extracting, should I write "Terdakwa" correctly capitalized? Like how in English you'd capitalize proper nouns, but since this is Indonesian law terms, probably "Terdakwa" is always lowercase unless starting a sentence.

Wait, in the samples given ([RAG_DB_EXAMPLE_*]), the extracted info uses phrases like "Terdakwa I FAUZI bin MAKRUP:" – so they start with "Terdakwa" followed by specific names. Therefore, our output needs to list the actual people called "Terdakwa" according to the docs.

However, in the provided chunks, most times "Terdakwa" is just referenced as a role (like "Terdakwa" meaning the defendant in general), rather than giving his/her full name. Wait, but sometimes the documents specify names associated with Terdakwa.

For example, in Chunk 4: "diberangkatkan ke rumah TERDAKWA (085222223415)", indicating that Terdakwa has a contact number listed. Maybe the real name hasn't been disclosed because it's a generic reference during trial proceedings.

From the task description: Extract the 'Terdakwa' section. Since the question asks specifically for the 'bagian 'Terdakwa'', likely referring to sections where the word "Terdakwa" is explicitly stated along with its attributes.

Given the analysis above, the key points found in the chunks:

- Chunk 1: Mentions "TERDAKWA" once (with spelling error: "TERDAKWA didaerah")

- Chunk 4: Multiple mentions of "TERDAKWA":
   * "Orang suruhan TERDAKWA"
   * "diberangkatkan ke rumah TERDAKWA (085222223415)"

Other chunks don't seem to have clear mentions beyond those.

Now, checking against the RAG DB examples. Example 1 talks about Terdakwa admitting actions, Example 2 lists two defendants with names, Examples 3 & 4 describe cases involving Terdakwa.

Since the current doc doesn't give individual names for Terdakwa (only references to "Terdakwa"), similar to how in many trials the defendant may remain unnamed until convicted, but here the judge is referencing the defendant generally.

Wait, but in Chinese courts, often the defendant's identity can be inferred from context. Alternatively, in this case, the documents might only state "Terdakwa" without specifying the name, hence the answer will be something like "Terdakwa (contact number: 085222223415)".

Alternatively, could there be a hidden name elsewhere? Let's double-check.

In Chunk 3: "- Bahwa maksud Terdakwa memberikan bayaran kepada Sdr. YENI Binti PARMAN DODO..." → still just "Terdakwa".

No personal names attached to Terdakwa in the excerpts. Instead, the documents talk about Terdakwa sending money to various individuals (Saksi = witnesses).

Therefore, the correct approach is to extract every occurrence of "Terdakwa"/"TERDAKWA" from the chunks, standardize the casing (since in the db examples it's lowercased after the initial letter?), and present it cleanly.

According to the instructions: "Preserve the original text as much as possible [...] Except TYPE AND PUNCTUATION IGNORE IT". So even though there's a typo like "TERDAKWA" vs "Terdakwa", we need to adjust to correct form while keeping the essence.

Wait, the instruction says: "If there is typo and punctuation u have to fix it in extraction". So yes, fix typographical errors but keep the intended words.

Original texts have inconsistent capitalization and spacing. E.g., "TERDAKWA" in uppercase versus "Terdakwa" in titlecase.

We want to convert it to consistent Indonesian style. Typically, in formal contexts, such titles would be written with a single capital letter at the beginning, but in Indonesian legal terminology, "Terdakwa" is usually lowercase except when starting sentences.

Wait, in the RAG examples, they wrote things like "[RAG_DB_EXAMPLE_2]: Keterangan Ringkas: Terdakwa I FAUZI bin MAKRUP:", so here "Terdakwa" is lowercase.

Thus, the desired output should follow the same pattern: "Terdakwa" (lowercase) followed by whatever information is available.

Possible extractions:

From Chunk 4: "Orang suruhan TERDAKWA terslebut datang kerumah sekira akhir bulan september atau awal bulan oktober 2022 dan memberitahkan bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022 dan yang menyiapkanp tiket, paspor dan dokumen keberangkatan lainnya adalah TERDAKWA melalui sdr. UNANG."

After cleaning: "Terdakwa (agent): Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diundang keberangkatan pada tanggal 06 Oktober 2022. Yang menyediakan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

Wait, but the exact phrase needed is the part containing "Terdakwa"—not necessarily translating everything. We're supposed to extract the portion that describes Terdakwa.

Wait, the task says: "Ekstrak konten 'Terdakwa'" — so extract the contents related to Terdakwa.

Perhaps better phrasing: Identify all segments within the document chunks that discuss or define the "Terdakwa" entity.

Based on previous steps, the main occurrences are:

1. From Chunk 1: "untuk d iantar ke rumahnya TERDAKWA didaerah CIANJUR"
   Cleaned version: "untuk diantar ke rumahnya Terdakwa di daerah Cianjur"

2. From Chunk 4: Two mentions:
   "a. Orang suruhan TERDAKWA terslebut datang kerumah sekira akhir bulan september atau awal bulan oktober 2022 ..."
   "diberangkatkan ke rumah TERDAKWA (085222223415)"

Cleaning both:
"Terdakwa (nomor telepon: 085222223415)"
"Terdakwa merupakan penyedia layanan transportasi yang mengatur keberangkatan korban"

Wait, but the exact wording matters. Need to capture the descriptions around Terdakwa.

Alternative plan: Compile all unique mentions of Terdakwa from the chunks, remove extra spaces/typo fixes, maintain order.

List of mentions:

- Chunk 1: "untuk diantar ke rumahnya TERDAKWA didaerah CIANJUR"
  Fix: "untuk diantar ke rumahnya Terdakwa di daerah Cianjur"

- Chunk 4: "Orang suruhan TERDAKWA terslebut datang kerumah sekira akhir bulan september atau awal bulan oktober 2022 dan memberitahukan bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022 dan yang menyiapkanp tiket, paspor dan dokumen keberangkatan lainnya adalah TERDAKWA melalui sdr. UNANG."
  Fixed: "Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahunya bahwa akan diubahangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

Note: Fixed typos like "terslebut" -> "tersebut", "datang kerumah"->"datang ke rumah", "diuberangkatkan"->"diuberangkatkan" (maybe "diambangkatkan"? Not sure, depends on context.)

Also, "yang menyiapkanp" becomes "yang menyiapkan".

Second mention in Chunk 4: "diberangkatkan ke rumah TERDAKWA (085222223415)"
Fixed: "diberangkatkan ke rumah Terdakwa (085222223415)"

Putting together the cleaned versions.

The goal is to create a concise, well-formatted string matching the RAG_db_example styles.

Example outputs show structures like:
"[RAG_DB_EXAMPLE_2]" includes "Terdakwa I FAUZI bin MAKRUP: ..." so it specifies the name.

But in our case, the documents do NOT provide the actual name of Terdakwa—they just say "Terdakwa" repeatedly. Hence, the extraction won't include a name but rather descriptive statements about Terdakwa's activities.

Following the examples, especially [RAG_DB_EXAMPLE_4], which says: "Terdakwa mengakui telah merekrut dan memberangkatkan korban RETNO WAHYU SURYANINGSIH dan DEWI SETIYOWATI ke Malaysia.", so it's describing what Terdakwa did.

Our task requires us to extract the portions where Terdakwa is discussed—not invent new data—but pull verbatim (cleaned) passages.

Considering all this, my final extraction should compile the relevant parts from the chunks regarding Terdakwa.

Key findings:

- In Chunk 4, Terdakwa is described as having a mobile number (085222223415)
- Terdakwa arranged transportation tickets, passports, documentation via UNANG
- Terdakwa received payments from victims (from Chunk 3: "Terdakwa memberikan bayaran")

Specifically, compiling the most informative parts:

From Chunk 4:
"Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."
Plus,
"Diberangkatkan ke rumah Terdakwa (085222223415)"

Also, from Chunk 3:
"Maksud Terdakwa memberikan bayaran kepada Sdr. YENI Binti PARMAN DODO..."

But the focus is on extracting the 'Terdakwa' section—the parts that tell what Terdakwa does.

To match the required format, I'll construct a summary statement akin to the examples.

Sample Format Reference: [RAG_DB_EXAMPLE_4]
It reads: "Terdakwa mengakui telah merekrut dan memberangkatkan korban RETNO WAHYU SURYANINGSIH dan DEWI SETIYOWATI ke Malaysia."
So the template is: "Terdakwa [verb tense] [action]."

In our case, the documents indicate Terdakwa organized the travel process, had contacts, paid fees, etc.

Constructing accordingly:
"Terdakwa merupakan individu yang mengorganisasikan keberangkatan korban ke Arab Saudi melalui jalur imigresi dan penampungan di Jordania. Terdakwa dilakukan pembayaran kepada beberapa saksi seperti Sdr. Yeni Binti Parman Dodo, Sdri. Santti Susanti Binti Ubani Iing, dll. Terdakwa memiliki nomor telepon 085222223415."

Wait, but must stick strictly to the source material without adding interpretation.

Better to quote directly from the chunks after cleanup.

Best approach: Take the raw text snippets mentioning Terdakwa, fix minor typos/spelling, and combine them concisely.

**Final Extraction Draft:**

From Chunk 4:
"Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."
"Anda diberangkatkan ke rumah Terdakwa (085222223415)."

Combined and formatted neatly.

Adjustments made:
- Corrected "TERSLEBUH" to "Tersebut"
- Removed unnecessary characters like "p" in "menyiapkanp"
- Standardized date/month spellings (September/October)
- Added missing space before commas
- Capitalizing days appropriately (no change needed as per Indonesian conventions)

Checking against the examples: They tend to summarize action verbs + objects.

My draft focuses on the facts presented about Terdakwa’s involvement.

Which RAG example matches best? Probably [RAG_DB_EXAMPLE_4] since it discusses Terdakwa organizing migration to foreign countries.

Yes, [RAG_DB_EXAMPLE_4] is about Terdakwa recruiting and transporting victims abroad, very close to our scenario.

So I’ll cite [RAG_DB_EXAMPLE_4].

**Final Answer Structure:**

"Terdakwa merupakan individu yang mengkoordinasikan keberangkatan korban ke Arab Saudi melalui sistem dokumentasi dan penampungan di Jordania. Berdasarkan catatan, Terdakwa memiliki hubungan dengan sdr. UNANG untuk menyiapkan tiket, paspor, dan dokumen keberangkatan. Selain itu, Terdakwa dinilai memiliki nomor telepon 085222223415."

Wait, but the requirement says to preserve original text as much as possible. Should avoid paraphrasing too heavily.

Maybe safer to copy-paste the cleaned fragments without restructuring entirely.

**Revised attempt focusing on literal quotes:**

"Terdakwa (nomor telepon: 085222223415) menjadi pemilik rumah bagi korban yang dihubungi oleh orang suruhan Terdakwa pada akhir bulan September atau awal bulan Oktober 2022. Terdakwa melalui sdr. UNANG menyiapkan tiket, paspor, dan dokumen keberangkatan korban."

But need to make sure it's accurate.

Actually, the precise extraction should be:

From Chunk 4:
"Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."
And
"diberangkatkan ke rumah Terdakwa (085222223415)"

Combining these gives:
"Terdakwa (telepon: 085222223415) merupakan entitas yang dinyatakan dalam dokumen ini sebagai pihak yang mengatur keberangkatan korban. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

But the instruction says to extract the 'part' containing Terdakwa, not add explanations. Just the factual bits.

Probably safest to produce a short paragraph combining the key points from the chunks.

After careful consideration, here's the proposed extraction:
"Terdakwa (nomor telepon: 085222223415) merupakan pihak yang mengatur keberangkatan korban ke Arab Saudi melalui sdr. UNANG. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Penyedia tiket, paspor, dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

But need to verify grammar and consistency.

Wait, the original says "Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG." Which translates to "Who prepares the tickets, passport, and other departure documents is Terdakwa via sdr. UNANG."
So the translation implies Terdakwa works through UNANG.

Corrected version avoiding passive voice confusion:
"Terdakwa (nomor telepon: 085222223415) mengatur keberangkatan korban ke Arab Saudi melalui sdr. UNANG. Seorang pegawai Terdakwa datang ke rumah pada akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa keberangkatan akan dilakukan pada tanggal 06 Oktober 2022."

But the instruction emphasizes preservation of original text. Better to stay closer to the original language.

Final decision: Use the cleaned-up sentences from the chunks without significant rewriting.

Extracted Text:
"Terdakwa (nomor telepon: 085222223415) merupakan pihak yang mengirimkan korban ke arah Arab Saudi. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

Wait, but the original says "diberangkatkan ke rumah Terdakwa" (sent to Terdakwa's home), implying Terdakwa receives the passengers. Possibly misinterpretation. To adhere precisely: From Chunk 4: "diberangkatkan ke rumah TERDAKWA (085222223415)" → translated as "transported to Terdakwa's house (phone number...)"
So correction: "korban diberangkatkan ke rumah Terdakwa (085222223415)"
Including this detail makes sense.

Compiling all:
"Terdakwa (nomor telepon: 085222223415) merupakan pihak yang menerima korban di wilayah Cianjur. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

Wait, in Chunk 1 there's a mention of "daerah CIANJUR" (Cianjur area), so including that adds value. Adding that bit improves completeness.

Full extraction considering all sources:
"Terdakwa (nomor telepon: 085222223415) berlokasi di daerah Cianjur. Orang suruhan Terdakwa datang ke rumah sekira akhir bulan September atau awal bulan Oktober 2022 dan memberitahu bahwa akan diuberangkatkan pada tanggal 06 Oktober 2022. Yang menyiapkan tiket, paspor dan dokumen keberangkatan lainnya adalah Terdakwa melalui sdr. UNANG."

This combines the location from Chunk 1 ("cianjur") and the activity timeline from Chunk 4. Double-checked for typos and punctuation corrections. Finally, citing [RAG_DB_EXAMPLE_4] as the closest example since it deals with Terdakwa facilitating overseas work visas/migration.
`;

  const simulateThinking = (text: string) => {
    if (selectedModel !== "qwen") return;

    setIsThinking(true);
    setThinkingContent("");

    const words = text.split(" ");
    let currentIndex = 0;

    const typeWord = () => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(" ");
        setThinkingContent(currentText);
        currentIndex++;

        // Slightly faster thinking than typing
        const delay = Math.random() * 80 + 40;
        setTimeout(typeWord, delay);
      } else {
        // Thinking complete, save completed thinking and start reply
        setCompletedThinking(text);
        setIsThinking(false);
        setThinkingContent("");
        setTimeout(() => {
          simulateTyping(fullResponse);
        }, 500); // Brief pause before starting reply
      }
    };

    typeWord();
  };

  const simulateTyping = (text: string) => {
    setIsTyping(true);
    setTypingMessage("");

    const words = text.split(" ");
    let currentIndex = 0;

    const typeWord = () => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(" ");
        setTypingMessage(currentText);
        currentIndex++;

        // Random delay between 50-150ms for more natural typing
        const delay = Math.random() * 100 + 50;
        setTimeout(typeWord, delay);
      } else {
        // Typing complete, add to store
        setIsTyping(false);
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: text
        };
        addMessage(selectedModel, assistantMessage);
        setTypingMessage("");
      }
    };

    typeWord();
  };

  const submitMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      pdf: uploadedPdf || undefined
    };

    addMessage(selectedModel, userMessage);
    setInputValue("");
    setUploadedPdf(null); // Clear the uploaded PDF after sending

    // Start thinking simulation for Qwen, or direct reply for others
    setTimeout(() => {
      if (selectedModel === "qwen") {
        simulateThinking(thinkingContentText);
      } else {
        simulateTyping(fullResponse);
      }
    }, 500);
  };  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  const isInitialState = messages.length === 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen bg-white">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">PlaceholderAI</h1>
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {isInitialState ? (
            // Welcome State
            <div className="text-center py-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Welcome to PlaceholderAI
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Indonesian Legal LLM for Human Trafficking Cases
              </p>
              <div className="text-sm text-gray-500">
                Ask me anything about legal documents and case analysis
              </div>
            </div>
          ) : (
            // Chat Messages
            messages.map((message) => (
              <div key={message.id}>
                {/* PDF Visual - show above user messages */}
                {message.role === 'user' && message.pdf && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border mb-4 animate-in fade-in-0 slide-in-from-top-2 duration-500">
                    <FileText className="h-6 w-6 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {message.pdf.name}
                    </span>
                  </div>
                )}

                {/* Thinking Dropdown for Qwen - show above assistant messages */}
                {message.role === 'assistant' && selectedModel === "qwen" && completedThinking && (
                  <div className="flex justify-start animate-in fade-in-0 slide-in-from-left-2 duration-500 mb-2">
                    <div className="max-w-2xl w-full">
                      <button
                        onClick={() => setThinkingExpanded(!thinkingExpanded)}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border"
                      >
                        <ChevronDown className={`h-3 w-3 transition-transform ${thinkingExpanded ? 'rotate-180' : ''}`} />
                        Thinking process
                      </button>
                      {thinkingExpanded && (
                        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-300">
                          <p className="text-sm text-blue-800 whitespace-pre-wrap">
                            {completedThinking}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 ${message.role === 'user' ? 'slide-in-from-right-2' : 'slide-in-from-left-2'} duration-500`}>
                  <Card className={`max-w-2xl p-4 ${message.role === 'user' ? 'bg-blue-500 text-white shadow-sm hover:shadow-md' : 'bg-gray-100 shadow-sm hover:shadow-md'} transition-shadow`}>
                    <p>{message.content}</p>
                  </Card>
                </div>

                {/* Disclaimer for assistant messages */}
                {message.role === 'assistant' && (
                  <div className="text-xs text-gray-500 mt-1 text-center max-w-2xl mx-auto">
                    ⚠️ Aplikasi ini masih dalam tahap pengembangan awal (BETA), sehingga jawaban yang diberikan bukanlah jawaban resmi atau hasil analisis sebenarnya dari model AI. Gunakan sebagai referensi saja.
                  </div>
                )}

              </div>
            ))
          )}

          {/* Thinking Display - integrated into chat */}
          {isThinking && selectedModel === "qwen" && (
            <div className="flex justify-start animate-in fade-in-0 slide-in-from-left-2 duration-500">
              <div className="max-w-2xl bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Thinking...</span>
                </div>
                <p className="text-sm text-blue-800 whitespace-pre-wrap">
                  {thinkingContent}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-in fade-in-0 slide-in-from-left-2 duration-500">
              <Card className="max-w-2xl p-4 bg-gray-100 shadow-sm">
                <p className="whitespace-pre-wrap">
                  {typingMessage}
                  <span className="animate-pulse">|</span>
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Uploaded PDF Display */}
          {uploadedPdf && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              <FileText className="h-6 w-6 text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                {uploadedPdf.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedPdf(null)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                ×
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="pdf-upload"
              />
              <Button type="button" variant="outline" size="icon" className="shrink-0 hover:bg-gray-50 transition-colors">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submitMessage();
                  }
                }}
                placeholder="Ask anything..."
                className="min-h-[44px] max-h-32 resize-none pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                rows={1}
              />
              <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2 hover:bg-gray-100 transition-colors">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" size="icon" className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white transition-colors" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

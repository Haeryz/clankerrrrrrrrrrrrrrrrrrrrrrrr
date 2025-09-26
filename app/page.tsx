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
    qwen: "Ringkasan: Berdasarkan alat bukti dan keterangan di persidangan, terungkap fakta bahwa Terdakwa Ferian Sambouw (Alias Ferian) telah mencarikan pelanggan untuk berhubungan seks dengan Saksi Livi (Pelaku Prostitusi Seks Komersial) melalui aplikasi MiChat/WhatsApp. Terdakwa membuat akun palsu seolah-olah dirinya adalah perempuan yang dapat melayani berhubungan badan dengan laki-laki, menawarkan \"800 ful-service, bisa negosi, stay hotel dan panggilan hotel, cash kamar\", dan mengarahkan pelanggan ke Saksi Livi untuk dilayani berhubungan badan layaknya suami istri. Fakta Detail: Terdakwa Ferian Sambouw telah bekerja sebagai penyalur jasa Open Bo semenjak Bulan Mei 2023. Pada tanggal 15 Juni 2023 sekira pukul 23.50 WIT, Tim Polisi Polda Papua melakukan patroli di Hotel @HOM Premiere Abepura dan menemukan Saksi Livi (PSK) yang sedang beraktivitas. Sebagai respons, Saksi Perkasa Jaya menghubungi Terdakwa Ferian melalui WhatsApp untuk memesan layanan. Selama tinggal bersama Terdakwa, Saksi Livi telah melayani berhubungan seksual setidaknya 20 (dua puluh) laki-laki. Uang pembayaran hasil melayani hubungan seksual dari tamu yang diterima oleh Saksi Livi diserahkan kepada Terdakwa Ferian untuk dipergunakan membayar hotel, membeli makan dan kebutuhan lainnya. Pada tanggal 16 Juni 2023 sekira jam 01.30 WIT, Terdakwa menerima telepon dari tamu yang ingin mencari tiga perempuan untuk berhubungan seks, namun hanya ada satu perempuan (Saksi Livi) di Hotel @Home, sehingga Terdakwa menghubungi Saksi Iwan untuk mencari dua perempuan tambahan.",
    gemma: "Berikut daftar nama TerDakwanya yaitu:\n*   Ichа Bintі UbеAd\n*    Sriуono Als Kopral Bin Putri Sujiyanto\n*     Hari уano Bin Delijo\n*      Мiftahur Rijali Bin Abrori\n\n\n**Catatan:** Analisa lebih lanjut dapat dilakukan mengenai peran masing-masing terdakwa sesuai konteksi keseluruhan isi dokumen.",
    llama: "[INPUT] Terdakwa I FAUZI bin MAKRUP: Mengakui diajak oleh saksi Rasimin untuk membantu memantau lokasi pemberangkatan PMI ilegal. Mengakui meminjamkan rekening bank istrinya untuk menerima dana operasional dan menerima upah. Menjelaskan perannya saat hari kejadian, dari memantau hingga melarikan diri saat penggerebekan.\n\n[OUTPUT]\nTerdakwa I FAUZI bin MAKRUP\n\n\n[INPUT] Terdakwa II JARI bin DJUMANGIN: Mengakui diajak Terdakwa I untuk ikut membantu memantau lokasi. Menjelaskan perannya yang sama dengan Terdakwa I d...\n\n[OUTPUT]\nTerdakwa II JARI bin DJUMANGIN\n\n\n[INPUT] Terdakwa mengakui perbuatannya. Ia kenal Anak Saksi dan telah 6 kali menawarkan jasa BO kepada tamu. Ia menawarkan tarif Rp. 1.200.000 dan akan mengambil keuntungan. Terdakwa juga menawarkan jasa perempuan lain selain Anak Saksi. Keuntungan yang didapat digunakan untuk kebutuhan sehari-hari.\n\n[OUTPUT]\nTerdakwa"
  };

  const fullResponse = responses[selectedModel as keyof typeof responses];

  const thinkingContentText = `
Saya perlu menganalisa semua chunk dokumen yang diberikan dan mengekstrak "Fakta Hukum" dengan benar sesuai instruksi.

Langkah-langkah saya:

1.  **Analisis semua chunk dokumen**
    Ada 4 chunk dokumentasi yang diberikan. Mari analisis masing-masing chunk untuk menemukan bagian yang berisi "Fakta Hukum".

2.  **Identifikasi bagian yang berisi 'Fakta Hukum'**
    Dari konsep umum tentang putusan pengadilan, "fakta hukum" biasanya merujuk pada deskripsi detail kasus yang menjadi dasar bagi kesimpulan hukum mahkamah. Ini biasanya berupa uraian kronologis peristiwa, karakteristik terdakwa, bukti-bukti yang didapat, dll.

3.  **Gunakan contoh format dari database sebagai referensi**

    Contoh format dari database seperti:
    - [RAG_DB_EXAMPLE_1]: Memiliki ringkasan singkat dan detail fakta
    - [RAG_DB_EXAMPLE_2]: Mengandung "Ringkasan:" dan "Fakta Detail:"
    - [RAG_DB_EXAMPLE_3]: Mirip dengan contoh 2 tetapi lebih spesifik
    - [RAG_DB_EXAMPLE_4]: Punya struktur "Ringkasan:" dan "Fakta Detail"

    Format yang ingin saya ikuti adalah:
    \`\`\`
    Ringkasan: ...
    Fakta Detail: ...
    \`\`\`

4.  **Ekstrak konten 'Fakta Hukum' dengan format yang bersih dan terstruktur**

    Mari lihat isi dari setiap chunk:

    Chunk 1:
    Ini tampaknya berisi catatan tentang aktifitas terdakwa dalam mencari wanita untuk berhubungan seks. Informasi seperti jumlah wanita yang dicari, metode pencarian (melalui WhatsApp/michat), lokasi, dll.

    Chunk 2:
    Berisi informasi tentang operasi polisi di Hotel @HOM Premier Abepura, temuan saksi Livi (psk), dan intervensi terdakwa Ferian sebagai penyalur jasa.

    Chunk 3:
    Memuat bagian "Menimbang..." yang merupakan pendugaan/hukuman dari majelis hakim. Ini memiliki informasi penting tentang apa yang dibuktikan dalam kasus ini.

    Chunk 4:
    Sebuah potongan yang mirip dengan Chunk 2, juga berbicara tentang aktivitas terdakwa.

    Berdasarkan analisis, bagian yang paling relevan untuk "Fakta Hukum" adalah bagian yang menjelaskan peristiwa-peristiwa yang terjadi beserta detail-detailnya, bukan hanya kesimpulan hukum ("Menimbang...").

    Di Chunk 3, saya melihat frasa "Menimbang," yang merupakan bagian dari argumen hukum yang mengidentifikasi fakta-fakta yang menjadi dasar untuk keputusan hukum. Bagian ini sangat relevan untuk ekstraksi "Fakta Hukum".

    Namun, saya juga melihat di Chunk 2 dan Chunk 4 ada deskripsi yang cukup detil tentang aktivitas terdakwa.

    Untuk menentukan apakah bagian yang tepat adalah bagian "Menimbang", mari kita tinjau ulang:

    Bagian "Menimbang" dalam sebuah putusan pengadilan biasanya berisi analisis faktor-faktor yang menjadi dasar untuk keputusan hukum. Ini adalah area yang sangat relevan untuk ekstraksi "Fakta Hukum" karena menggambarkan fakta-fakta yang telah diverifikasi dan menjadi dasar untuk keputusan hukum.

    Secara spesifik, di Chunk 3 saya melihat:
    "Menimbang, bahwa uang pembayaran hasil melayani hubungan seksual dari ntamu..."

    Dan juga:
    "- Bahwa selama tinggal bersama dengan terdakwa ferian, saksi Livi sudah melayani berhubungan seksual setidaknya 20 (dua puluh) laki-laki;"
    "- Bahwa uang pembayaran hasil melayani hubungan seksual dari tamu, yang diterima oleh saksi Livi, diserahkan kepada terdakwa Ferian untuk dipergunakan membayar hotel, membeli makan dan kebutuhan mereka lainnya."

    Itu adalah bagian yang sangat cocok untuk "Fakta Hukum" karena menggambarkan fakta-fakta konkret yang menjadi dasar keputusan hukum.

    Selain itu, di Chunk 2 dan Chunk 4 terdapat deskripsi yang lebih detail tentang aktivitas terdakwa, misalnya:
    "Pada hari Kamis, tanggal 15 Juni 2023 sekira pukul 23.50 WIT..."
    "Saksi Perkasa Jaya yang beberapa kali sebelumnya sudah pernah mengguna kang jasa terdakwa Ferian..."

    Oleh karena itu, saya akan mengambil kombinasi dari informasi di Chunk 2, Chunk 3, dan Chunk 4 untuk membuat ekstraksi "Fakta Hukum" yang lengkap.

    Beberapa fakta utama yang saya identifikasi:
    1. Terdakwa Ferian Sambouw (alias Ferian) adalah penyalur jasa open bo/koneksi seks
    2. Terdakwa menggunakan aplikasi MiChat/MWhatsApp untuk mencari calon pasangan
    3. Terdakwa menghubungkan tamu laki-laki dengan Saksi Livi (PSK)
    4. Selama tinggal bersama terdakwa, Saksi Livi telah melayani minimal 20 laki-laki
    5. Uang pembayaran dari transaksi seks diserahkan terdakwa untuk biaya hidup
    6. Aktivitas terdakwa terjadi di Hotel @HOM Premiere Abepura, Jayapura
    7. Transaksi terjadi mulai tanggal 15-June-2023 hingga 16-Jun-2023

    Saya akan susun format ekstraksi berdasarkan contoh-contoh database yang diberikan. Format yang saya rencanakan:
    \`\`\`
    Ringkasan: <ringkasan singkat>
    Fakta Detail: <detail fakta yang lebih spesifik>
    \`\`\`

    Saya akan menggunakan [RAG_DB_EXAMPLE_2] sebagai acuan karena contohnya menggambarkan situasi serupa (transaksi seks melalui media sosial).

    Perlu saya pastikan agar ekstraksi saya:
    1. Akurat
    2. Lengkap
    3. Sesuai format database
    4. Preservasi teks asli sebanyak mungkin (tanpa error typografi/punctuation)

    Mari saya tuliskan ekstraksi:

    Ringkasan: Berdasarkan alat bukti dan keterangan di persidangan, terungkap fakta bahwa Terdakwa Ferian Sambouw (Alias Ferian) telah mencarikan pelanggan untuk berhubungan seks dengan Saksi Livi (Peeker Seks Komersial) melalui aplikasi MiChat/Wahtsap. Terdakwa membuat akun palsu sebagai perempuan yang dapat melayani berhubungan badan dengan laki-laki, menawarkan "800 full servis, bisa negotiat, stay hotel dan panggilan hotel, cash kamar", dan mengarahkan pelanggan ke Saksi Livi untuk dilayani berhubungan badan layaknya suami istri.

    Fakta Detail: Terdakwa Ferian Sambouw telah menerapkan sistem penyaluran jasa openbo semenjak Bulan Mei 2023. Pada tanggal 15 Juni 2023 sekira pukul 23.50 WIT, Tim Polisi Polda Papua melakukan patroli di Hotel @HOM Premiere Abepura dan menemukan Saksi Livi (PSK) yang sedang beraktivitas. Sebagai respons, Saksi Perkasa Jaya menghubungi Terdakwa Ferian melalui WhatsApp untuk memesan layanan. Selama tinggal bersama Terdakwa, Saksi Livi telah melayani berhubungan seksual setidaknya 20 (dua puluh) laki-laki. Uang pembayaran hasil melayani hubungan seksual dari tamu yang diterima oleh Saksi Livi diserahkan kepada Terdakwa Ferian untuk dipergunakan membayar hotel, membeli makan dan kebutuhan lainnya. Pada tanggal 16 Juni 2023 sekira jam 01.30 WIT, Terdakwa menerima telepon dari tamu yang ingin mencari tiga perempuan untuk berhubungan seks, namun hanya ada satu perempuan (Saksi Livi) di Hotel @HOME, sehingga Terdakwa menghubungi Saksi Iwan untuk mencari dua perempuan tambahan.

    Saya menggunakan [RAG_DB_EXAMPLE_2] sebagai referensi utama karena format dan topiknya sama (transaksi seks melalui aplikasi). Contoh ini juga memiliki struktur "Ringkasan" dan "Fakta Detail" yang sesuai dengan format yang saya inginkan.

    Saya perlu memastikan bahwa saya tidak mengubah huruf kapital, kata kunci, angka, atau tanda baca yang mendasarinya. Beberapa kata yang muncul di teks asli seperti "open BO" (di teks asli "open BO") dan "miChat" (teks asli "MiChat"), saya akan preservasi dengan cara yang sesuai.

    Saya juga perlu memperbaiki typo jika ada, seperti "Wahtsap" -> "Whatsapp" (tapi di teks aslinya "whatsapp" dan "michat"). Di teks asli, ada "michat" dan "whatsapp" yang mungkin kurang tepat, tapi saya akan tetap menggunakan versi yang lebih standar.

    Let's check if this matches with what we need from each document fragment:

    From Document Chunk 1:
    - Terdakwa mencari 3 perempuan
    - Terdakwa menghubungi Saksi Iwan untuk mencari 2 perempuan
    - Terdakwa menggunakan aplikasi MiChat
    - Terdakwa menerima pesan dari tamu pada tanggal 16 juni 2023 jam 01.30 wits

    From Document Chunk 2:
    - Operasi polisi di Hotel @HOM pada tanggal 15 juni 2023
    - Temuan Saksi Livi (PSK) dan Saksi Perkasa Jaya
    - Terdakwa Ferian sebagai penyalur jasa

    From Document Chunk 3 & 4:
    - Saksi Livi melayani minimal 20 laki-laki
    - Uang pembayaran diserahkan ke Terdakwa untuk kepentingan hidup
    - Aktivitas terjadi di Hotel @HOM Premiere Abepura

    Okay, saya pikir ekstraksi ini sudah cukup lengkap dan sesuai dengan format yang diinginkan.

    Saya akan ubah sedikit supaya lebih akurat dan sesuai dengan teks asli:

    * "open BO" -> "open Bo"
    * "michat" -> "MiChat" (sesuai dengan teks asli yang menggunakan capital letter)
    * "whatsapp" -> "WhatsApp"
    * "Saksi Livi" -> "Saksi Livi" (tidak ada typo)
    * "Terminologi": "penyalur jasa open bo" -> "penyalur jasa Open Bo" (tetapi di teks asli "open BO")

    Saya akan perbaiki sedikit untuk lebih akurat:

    Ringkasan: Berdasarkan alat bukti dan keterangan di persidangan, terungkap fakta bahwa Terdakwa Ferian Sambouw (Alias Ferian) telah mencarikan pelanggan untuk berhubungan seks dengan Saksi Livi (Penjual Layanan Seks Komersial) melalui aplikasi MiChat/WhatsApp. Terdakwa membuat akun palsu seolah-olah dirinya adalah perempuan yang dapat melayani berhubungan badan dengan laki-laki, menawarkan "800 full service, bisa negotiate, stay hotel dan panggilan hotel, cash kamar", dan mengarahkan pelanggan ke Saksi Livi untuk dilayani berhubungan badan layaknya suami istri.

    Fakta Detail: Terdakwa Ferian Sambouw telah bekerja sebagai penyalur jasa Open Bo semenjak Bulan Mei 2023. Pada tanggal 15 Juni 2023 sekira pukul 23.50 WIT, Tim Polisi Polda Papua melakukan patroli di Hotel @HOM Premiere Abepura dan menemukan Saksi Livi (PSK) yang sedang beraktivitas. Sebagai respons, Saksi Perkasa Jaya menghubungi Terdakwa Ferian melalui WhatsApp untuk memesan layanan. Selama tinggal bersama Terdakwa, Saksi Livi telah melayani berhubungan seksual setidaknya 20 (dua puluh) laki-laki. Uang pembayaran hasil melayani hubungan seksual dari tamu yang diterima oleh Saksi Livi diserahkan kepada Terdakwa Ferian untuk dipergunakan membayar hotel, membeli makan dan kebutuhan lainnya. Pada tanggal 16 Juni 2023 sekira jam 01.30 WIT, Terdakwa menerima telepon dari tamu yang ingin mencari tiga perempuan untuk berhubungan seks, namun hanya ada satu perempuan (Saksi Livi) di Hotel @Home, sehingga Terdakwa menghubungi Saksi Iwan untuk mencari dua perempuan tambahan.

    Saya menggunakan [RAG_DB_EXAMPLE_2] sebagai referensi utama.

    Cek kembali untuk memastikan tidak ada typo dan sesuai dengan teks asli:

    - "Open Bo" vs "open BO"? Di teks asli: "open BO" (mungkin maksudnya "open boy")
    - "negotiate" vs "negociate"? Di teks asli: "negou" (mungkin salah typing dari "nego" atau "negotiate")
    - "cash kamar" vs "cash kamar"?

    Saya akan sesuaikan dengan teks asli yang lebih akurat:

    Dari teks asli:
    - "800 fullservis, bisa negou, stay hotel dan panggilan hotel, cash kamar"

    Artikel "fullservis" = "fulservice"?
    "negou" = "negosiasikan"/"negotiase"?
    "cash kamar" = "uang tunai kamar"?

    Saya akan gunakan bahasa yang lebih formal dan sesuai dengan konteks hukum:

    Ringkasan: Berdasarkan alat bukti dan keterangan di persidangan, terungkap fakta bahwa Terdakwa Ferian Sambouw (Alias Ferian) telah mencarikan pelanggan untuk berhubungan seks dengan Saksi Livi (Pelaku Prostitusi Seks Komersial) melalui aplikasi MiChat/WhatsApp. Terdakwa membuat akun palsu seolah-olah dirinya adalah perempuan yang dapat melayani berhubungan badan dengan laki-laki, menawarkan "800 ful-service, bisa negoisasi, stay hotel dan panggilan hotel, cash kamar", dan mengarahkan pelanggan ke Saksi Livi untuk dilayani berhubungan badan layaknya suami istri.

    Fakta Detail: Terdakwa Ferian Sambouw telah bekerja sebagai penyalur jasa Open Bo semenjak Bulan Mei 2023. Pada tanggal 15 Juni 2023 sekira pukul 23.50 WIT, Tim Polisi Polda Papua melakukan patroli di Hotel @HOM Premiere Abepura dan menemukan Saksi Livi (PSK) yang sedang beraktivitas. Sebagai respons, Saksi Perkasa Jaya menghubungi Terdakwa Ferian melalui WhatsApp untuk memesan layanan. Selama tinggal bersama Terdakwa, Saksi Livi telah melayani berhubungan seksual setidaknya 20 (dua puluh) laki-laki. Uang pembayaran hasil melayani hubungan seksual dari tamu yang diterima oleh Saksi Livi diserahkan kepada Terdakwa Ferian untuk dipergunakan membayar hotel, membeli makan dan kebutuhan lainnya. Pada tanggal 16 Juni 2023 sekira jam 01.30 WIT, Terdakwa menerima telepon dari tamu yang ingin mencari tiga perempuan untuk berhubungan seks, namun hanya ada satu perempuan (Saksi Livi) di Hotel @Home, sehingga Terdakwa menghubungi Saksi Iwan untuk mencari dua perempuan tambahan.

    Saya menggunakan [RAG_DB_EXAMPLE_2].

    Saya perhatikan bahwa di teks asli ada "Halaman X dari Y" dan disclaimer yang tidak relevan untuk fakta hukum, jadi saya tidak masukkan bagian tersebut.

    Saya juga memastikan bahwa saya tidak menghapus informasi penting seperti nama-nama saksi, tanggal, waktu, dan lokasi.

    Akhirnya, saya akan presentasikan hasil ekstraksi dengan format yang sesuai.
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

    // Check for specific phrases for Qwen model
    const isClassificationPhrase = inputValue.toLowerCase().trim() === "klasifikasi bagian ini" || 
                                   inputValue.toLowerCase().trim() === "bagian ini termasuk apa?";

    if (selectedModel === "qwen" && isClassificationPhrase) {
      const classifications = ["fakta hukum", "irah-irah", "penahanan", "surat barang bukti", "amar putusan", "pertimbangan hukum"];
      const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
      
      setTimeout(() => {
        simulateTyping(randomClassification);
      }, 500);
      return;
    }

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

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export type Language = "id" | "en";

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: () => "",
});

// Translation object containing all strings
const translations = {
  id: {
    // Header
    "app.title": "Aplikasi Komputasi Numerik",
    "app.subtitle": "Gauss Solver - Solusi Sistem Linear",

    // Tabs
    "tabs.input": "Input",
    "tabs.output": "Hasil",
    "tabs.steps": "Langkah-langkah",
    "tabs.visualization": "Visualisasi",
    "tabs.help": "Bantuan",

    // Input Section
    "input.title": "Masukkan Sistem Persamaan Linear",
    "input.description": "Konfigurasi parameter sistem linear Anda",
    "input.matrixSize": "Ukuran Matriks:",
    "input.matrixCoefficients": "Koefisien Matriks:",
    "input.matrixInstructions": "Masukkan matriks koefisien A dan vektor b untuk Ax = b",
    "input.vectorValues": "Nilai Vektor:",
    "input.method": "Metode Penyelesaian:",
    "input.gaussMethod": "Eliminasi Gauss",
    "input.gaussJordanMethod": "Eliminasi Gauss-Jordan",
    "input.solve": "Selesaikan",
    "input.solving": "Menyelesaikan...",
    "input.reset": "Reset",
    "input.error": "Terjadi kesalahan saat memproses persamaan.",
    "input.error.allZeros": "Matriks tidak boleh semua nol",
    "input.error.invalidNumbers": "Semua input harus berupa angka yang valid",

    // Output Section
    "output.title": "Hasil Penyelesaian",
    "output.solution": "Solusi:",
    "output.method": "Metode:",
    "output.status": "Status:",
    "output.message": "Pesan:",
    "output.variable": "Variabel",
    "output.value": "Nilai",
    "output.export": "Ekspor Hasil",
    "output.noSolution": "Tidak ada solusi unik",
    "output.gaussMethod": "Eliminasi Gauss",
    "output.gaussJordanMethod": "Eliminasi Gauss-Jordan",
    "output.solvedStatus": "Terselesaikan",
    "output.errorStatus": "Error",
    "output.status.solved": "Terselesaikan",
    "output.status.noSolution": "Tidak Ada Solusi",
    "output.status.infiniteSolutions": "Solusi Tak Hingga",
    "output.status.error": "Error",
    "output.waitingForResults": "Hasil akan muncul di sini setelah menyelesaikan sistem",
    "output.noSolutionComputed": "Belum ada solusi yang dihitung",
    "output.configureSystem": "Konfigurasikan sistem Anda dan klik 'Selesaikan'",
    "output.variableValues": "Nilai variabel x₁, x₂, ..., xₙ",
    "output.solutionSummary": "Ringkasan Solusi",
    "output.matrixSize": "Ukuran Matriks",
    "output.steps": "Langkah",
    "output.methodLabel": "Metode",
    "output.statusLabel": "Status",
    "output.successMessage": "Sistem berhasil diselesaikan menggunakan Eliminasi Gauss dengan pivoting parsial",

    // Steps Section
    "steps.title": "Langkah-langkah Penyelesaian",
    "steps.step": "Langkah",
    "steps.description": "Deskripsi",
    "steps.operation": "Operasi",
    "steps.matrix": "Matriks",
    "steps.empty": "Tidak ada langkah untuk ditampilkan. Selesaikan sistem terlebih dahulu.",
    "steps.noStepsToDisplay": "Tidak ada langkah untuk ditampilkan",
    "steps.solveSystem": "Selesaikan sistem untuk melihat langkah-langkah transformasi",
    "steps.animate": "Animasikan Langkah",
    "steps.animating": "Menganimasikan...",
    "steps.collapseAll": "Tutup Semua",
    "steps.expandAll": "Buka Semua",
    "steps.animationProgress": "Kemajuan Animasi: Langkah {current} dari {total}",
    "steps.controls": "Kontrol Langkah",
    "steps.controlsDesc": "Kontrol tampilan dan animasi langkah-langkah penyelesaian",
    "steps.operation.label": "Operasi:",
    "steps.augmentedMatrix": "Matriks Augmented",
    "steps.initialMatrix": "Matriks augmented awal",
    "steps.swapRows": "Pivoting parsial: Tukar baris {row1} dengan baris {row2}",

    // Visualization Section
    "visualization.title": "Visualisasi Matriks",
    "visualization.empty": "Tidak ada data visualisasi. Selesaikan sistem terlebih dahulu.",
    "visualization.notAvailable": "Tidak ada visualisasi tersedia",
    "visualization.solveToSee": "Selesaikan sistem untuk melihat representasi visual",
    "visualization.stepVisualization": "Visualisasi Langkah {step}",
    "visualization.matrixHeatmap": "Heatmap Matriks",
    "visualization.vectorB": "Vektor b",
    "visualization.solutionVisualization": "Visualisasi Solusi (2D)",
    "visualization.solutionPoint": "Representasi grafis dari titik solusi",

    // Help Section
    "help.title": "Bantuan",
    "help.intro": "Aplikasi ini membantu Anda menyelesaikan sistem persamaan linear menggunakan metode Eliminasi Gauss atau Gauss-Jordan.",
    "help.instructions": "Instruksi Penggunaan:",
    "help.step1": "1. Pilih ukuran matriks dari menu dropdown",
    "help.step2": "2. Isi koefisien matriks dan nilai vektor",
    "help.step3": "3. Pilih metode penyelesaian",
    "help.step4": "4. Klik 'Selesaikan' untuk memproses",
    "help.step5": "5. Lihat hasil, langkah-langkah, dan visualisasi pada tab yang sesuai",
    "help.gaussInfo": "Eliminasi Gauss: Mengubah matriks menjadi bentuk eselon baris, kemudian menggunakan substitusi mundur.",
    "help.gaussJordanInfo": "Eliminasi Gauss-Jordan: Mengubah matriks menjadi bentuk eselon baris tereduksi untuk mendapatkan solusi langsung.",

    // Help Section Tabs
    "help.tabs.overview": "Gambaran Umum",
    "help.tabs.inputGuide": "Panduan Input",
    "help.tabs.methods": "Metode",
    "help.tabs.examples": "Contoh",

    // Overview Tab
    "help.overview.whatIs": "Apa itu Gauss Solver?",
    "help.overview.description": "Gauss Solver adalah aplikasi berbasis web yang dirancang untuk menyelesaikan sistem persamaan linear menggunakan dua metode numerik fundamental: Eliminasi Gauss dan Eliminasi Gauss-Jordan.",
    "help.overview.keyFeatures": "Fitur Utama:",
    "help.overview.feature1": "Mendukung sistem 2×2 hingga 6×6",
    "help.overview.feature2": "Proses penyelesaian langkah demi langkah",
    "help.overview.feature3": "Transformasi matriks visual",
    "help.overview.feature4": "Ekspor hasil ke PDF atau TXT",
    "help.overview.feature5": "Validasi input real-time",
    "help.overview.feature6": "Langkah penyelesaian beranimasi",
    "help.overview.navigation": "Navigasi:",
    "help.overview.inputNav": "Konfigurasi ukuran sistem, metode, dan masukkan nilai matriks",
    "help.overview.outputNav": "Lihat hasil penyelesaian dan opsi ekspor",

    // Input Guide Tab
    "help.input.howTo": "Cara Memasukkan Data",
    "help.input.step1Title": "Langkah 1: Konfigurasi Sistem",
    "help.input.step1a": "Pilih jumlah variabel (2-6)",
    "help.input.step1b": "Pilih metode penyelesaian (Gauss atau Gauss-Jordan)",
    "help.input.step2Title": "Langkah 2: Masukkan Matriks",
    "help.input.systemForm": "Masukkan sistem Anda dalam bentuk",
    "help.input.matrixA": "Isi matriks koefisien A (sisi kiri)",
    "help.input.vectorB": "Isi vektor konstan b (sisi kanan)",
    "help.input.decimals": "Gunakan angka desimal (misalnya, 1.5, -2.3)",
    "help.input.empty": "Kolom yang kosong akan default ke 0",
    "help.input.tipTitle": "Tip:",
    "help.input.tip": "Gunakan tombol Tab untuk menavigasi antar kolom input dengan cepat",
    "help.input.validation": "Validasi Input",
    "help.input.validNumbers": "• Semua input harus berupa angka yang valid",
    "help.input.notAllZeros": "• Matriks tidak boleh semua nol",
    "help.input.singularMatrices": "• Sistem akan mendeteksi matriks singular",

    // Methods Tab
    "help.methods.title": "Metode Numerik",
    "help.methods.purposeLabel": "Tujuan: ",
    "help.methods.gaussTitle": "Eliminasi Gauss",
    "help.methods.gaussPurpose": "Tujuan: Mentransformasi matriks menjadi bentuk segitiga atas",
    "help.methods.gaussProcess": "Proses:",
    "help.methods.gaussStep1": "1. Eliminasi maju",
    "help.methods.gaussStep2": "2. Substitusi mundur",
    "help.methods.gaussStep3": "3. Menyelesaikan variabel",
    "help.methods.gaussBestFor": "Terbaik untuk: Sistem linear umum",

    "help.methods.jordanTitle": "Eliminasi Gauss-Jordan",
    "help.methods.jordanPurpose": "Tujuan: Mentransformasi matriks menjadi bentuk eselon baris tereduksi",
    "help.methods.jordanProcess": "Proses:",
    "help.methods.jordanStep1": "1. Eliminasi maju",
    "help.methods.jordanStep2": "2. Eliminasi mundur",
    "help.methods.jordanStep3": "3. Membaca solusi langsung",
    "help.methods.jordanBestFor": "Terbaik untuk: Mencari invers matriks",
    "help.methods.solutionTypes": "Tipe Solusi",
    "help.methods.uniqueSolution": "Solusi Unik",
    "help.methods.uniqueDesc": "Sistem memiliki tepat satu solusi",
    "help.methods.infiniteSolutions": "Solusi Tak Hingga",
    "help.methods.infiniteDesc": "Sistem memiliki tak hingga banyak solusi",
    "help.methods.noSolution": "Tidak Ada Solusi",
    "help.methods.noSolutionDesc": "Sistem tidak konsisten",

    // Example Tab
    "help.examples.title": "Contoh Soal",
    "help.examples.example1Title": "Contoh 1: Sistem 3×3",
    "help.examples.example1Desc": "Sistem linear tipikal dengan solusi unik",
    "help.examples.system": "Sistem persamaan:",
    "help.examples.solution": "Solusi: x = 2, y = 3, z = -1",
    "help.examples.loadExample": "Muat Contoh Ini",
    "help.examples.commonIssues": "Masalah Umum & Solusi",
    "help.examples.issue1": 'Masalah: "Matriks tidak boleh semua nol"',
    "help.examples.cause1": "Penyebab: Semua entri matriks adalah nol",
    "help.examples.solution1": "Solusi: Masukkan koefisien bukan nol untuk persamaan Anda",
    "help.examples.issue2": 'Masalah: "Matriks singular terdeteksi"',
    "help.examples.cause2": "Penyebab: Matriks tidak dapat dibalik",
    "help.examples.solution2": "Solusi: Periksa apakah persamaan linier independen",

    // Language Selector
    "language.select": "Pilih Bahasa:",
    "language.id": "Indonesia",
    "language.en": "Inggris",
  },
  en: {
    // Header
    "app.title": "Numerical Computation Application",
    "app.subtitle": "Gauss Solver - Linear System Solutions",

    // Tabs
    "tabs.input": "Input",
    "tabs.output": "Output",
    "tabs.steps": "Steps",
    "tabs.visualization": "Visualization",
    "tabs.help": "Help",

    // Input Section
    "input.title": "Input Linear Equation System",
    "input.description": "Configure your linear system parameters",
    "input.matrixSize": "Matrix Size:",
    "input.matrixCoefficients": "Matrix Coefficients:",
    "input.matrixInstructions": "Enter coefficient matrix A and vector b for Ax = b",
    "input.vectorValues": "Vector Values:",
    "input.method": "Solution Method:",
    "input.gaussMethod": "Gauss Elimination",
    "input.gaussJordanMethod": "Gauss-Jordan Elimination",
    "input.solve": "Solve",
    "input.solving": "Solving...",
    "input.reset": "Reset",
    "input.error": "An error occurred while processing the equations.",
    "input.error.allZeros": "Matrix cannot be all zeros",
    "input.error.invalidNumbers": "All inputs must be valid numbers",

    // Output Section
    "output.title": "Solution Results",
    "output.solution": "Solution:",
    "output.method": "Method:",
    "output.status": "Status:",
    "output.message": "Message:",
    "output.variable": "Variable",
    "output.value": "Value",
    "output.export": "Export Results",
    "output.noSolution": "No unique solution",
    "output.gaussMethod": "Gauss Elimination",
    "output.gaussJordanMethod": "Gauss-Jordan Elimination",
    "output.solvedStatus": "Solved",
    "output.errorStatus": "Error",
    "output.status.solved": "Solved",
    "output.status.noSolution": "No Solution",
    "output.status.infiniteSolutions": "Infinite Solutions",
    "output.status.error": "Error",
    "output.waitingForResults": "Results will appear here after solving the system",
    "output.noSolutionComputed": "No solution computed yet",
    "output.configureSystem": "Configure your system and click 'Solve'",
    "output.variableValues": "Values of variables x₁, x₂, ..., xₙ",
    "output.solutionSummary": "Solution Summary",
    "output.matrixSize": "Matrix Size",
    "output.steps": "Steps",
    "output.methodLabel": "Method",
    "output.statusLabel": "Status",
    "output.successMessage": "System solved successfully using Gauss Elimination with partial pivoting",

    // Steps Section
    "steps.title": "Solution Steps",
    "steps.step": "Step",
    "steps.description": "Description",
    "steps.operation": "Operation",
    "steps.matrix": "Matrix",
    "steps.empty": "No steps to display. Solve the system first.",
    "steps.noStepsToDisplay": "No steps to display",
    "steps.solveSystem": "Solve a system to see the transformation steps",
    "steps.animate": "Animate Steps",
    "steps.animating": "Animating...",
    "steps.collapseAll": "Collapse All",
    "steps.expandAll": "Expand All",
    "steps.animationProgress": "Animation Progress: Step {current} of {total}",
    "steps.controls": "Step Controls",
    "steps.controlsDesc": "Control the display and animation of solution steps",
    "steps.operation.label": "Operation:",
    "steps.augmentedMatrix": "Augmented Matrix",
    "steps.initialMatrix": "Initial augmented matrix",
    "steps.swapRows": "Partial pivoting: Swap row {row1} with row {row2}",

    // Visualization Section
    "visualization.title": "Matrix Visualization",
    "visualization.empty": "No visualization data. Solve the system first.",
    "visualization.notAvailable": "No visualization available",
    "visualization.solveToSee": "Solve a system to see visual representations",
    "visualization.stepVisualization": "Step {step} Visualization",
    "visualization.matrixHeatmap": "Matrix Heatmap",
    "visualization.vectorB": "Vector b",
    "visualization.solutionVisualization": "Solution Visualization (2D)",
    "visualization.solutionPoint": "Graphical representation of the solution point",

    // Help Section
    "help.title": "Help",
    "help.intro": "This application helps you solve systems of linear equations using Gauss Elimination or Gauss-Jordan methods.",
    "help.instructions": "Usage Instructions:",
    "help.step1": "1. Select the matrix size from the dropdown",
    "help.step2": "2. Fill in the matrix coefficients and vector values",
    "help.step3": "3. Choose a solution method",
    "help.step4": "4. Click 'Solve' to process",
    "help.step5": "5. View results, steps, and visualization in respective tabs",
    "help.gaussInfo": "Gauss Elimination: Transforms the matrix into row echelon form, then uses back substitution.",
    "help.gaussJordanInfo": "Gauss-Jordan Elimination: Transforms the matrix into reduced row echelon form to obtain the solution directly.",

    // Help Section Tabs
    "help.tabs.overview": "Overview",
    "help.tabs.inputGuide": "Input Guide",
    "help.tabs.methods": "Methods",
    "help.tabs.examples": "Examples",

    // Overview Tab
    "help.overview.whatIs": "What is Gauss Solver?",
    "help.overview.description": "Gauss Solver is a web-based application designed to solve systems of linear equations using two fundamental numerical methods: Gauss Elimination and Gauss-Jordan Elimination.",
    "help.overview.keyFeatures": "Key Features:",
    "help.overview.feature1": "Support for 2×2 to 6×6 systems",
    "help.overview.feature2": "Step-by-step solution process",
    "help.overview.feature3": "Visual matrix transformations",
    "help.overview.feature4": "Export results to PDF or TXT",
    "help.overview.feature5": "Real-time input validation",
    "help.overview.feature6": "Animated solution steps",
    "help.overview.navigation": "Navigation:",
    "help.overview.inputNav": "Configure system size, method, and enter matrix values",
    "help.overview.outputNav": "View solution results and export options",

    // Input Guide Tab
    "help.input.howTo": "How to Input Data",
    "help.input.step1Title": "Step 1: System Configuration",
    "help.input.step1a": "Select the number of variables (2-6)",
    "help.input.step1b": "Choose solution method (Gauss or Gauss-Jordan)",
    "help.input.step2Title": "Step 2: Matrix Entry",
    "help.input.systemForm": "Enter your system in the form",
    "help.input.matrixA": "Fill coefficient matrix A (left side)",
    "help.input.vectorB": "Fill constant vector b (right side)",
    "help.input.decimals": "Use decimal numbers (e.g., 1.5, -2.3)",
    "help.input.empty": "Empty fields default to 0",
    "help.input.tipTitle": "Tip:",
    "help.input.tip": "Use Tab key to navigate between input fields quickly",
    "help.input.validation": "Input Validation",
    "help.input.validNumbers": "• All inputs must be valid numbers",
    "help.input.notAllZeros": "• Matrix cannot be all zeros",
    "help.input.singularMatrices": "• System will detect singular matrices",

    // Methods Tab
    "help.methods.title": "Numerical Methods",
    "help.methods.purposeLabel": "Purpose: ",
    "help.methods.gaussTitle": "Gauss Elimination",
    "help.methods.gaussPurpose": "Purpose: Transform matrix to upper triangular form",
    "help.methods.gaussProcess": "Process:",
    "help.methods.gaussStep1": "1. Forward elimination",
    "help.methods.gaussStep2": "2. Back substitution",
    "help.methods.gaussStep3": "3. Solve for variables",
    "help.methods.gaussBestFor": "Best for: General linear systems",

    "help.methods.jordanTitle": "Gauss-Jordan Elimination",
    "help.methods.jordanPurpose": "Purpose: Transform matrix to reduced row echelon form",
    "help.methods.jordanProcess": "Process:",
    "help.methods.jordanStep1": "1. Forward elimination",
    "help.methods.jordanStep2": "2. Backward elimination",
    "help.methods.jordanStep3": "3. Direct solution reading",
    "help.methods.jordanBestFor": "Best for: Finding matrix inverse",
    "help.methods.solutionTypes": "Solution Types",
    "help.methods.uniqueSolution": "Unique Solution",
    "help.methods.uniqueDesc": "System has exactly one solution",
    "help.methods.infiniteSolutions": "Infinite Solutions",
    "help.methods.infiniteDesc": "System has infinitely many solutions",
    "help.methods.noSolution": "No Solution",
    "help.methods.noSolutionDesc": "System is inconsistent",

    // Example Tab
    "help.examples.title": "Example Problems",
    "help.examples.example1Title": "Example 1: 3×3 System",
    "help.examples.example1Desc": "A typical linear system with unique solution",
    "help.examples.system": "System of equations:",
    "help.examples.solution": "Solution: x = 2, y = 3, z = -1",
    "help.examples.loadExample": "Load This Example",
    "help.examples.commonIssues": "Common Issues & Solutions",
    "help.examples.issue1": 'Issue: "Matrix cannot be all zeros"',
    "help.examples.cause1": "Cause: All matrix entries are zero",
    "help.examples.solution1": "Solution: Enter non-zero coefficients for your equations",
    "help.examples.issue2": 'Issue: "Singular matrix detected"',
    "help.examples.cause2": "Cause: Matrix is not invertible",
    "help.examples.solution2": "Solution: Check if equations are linearly independent",

    // Language Selector
    "language.select": "Select Language:",
    "language.id": "Indonesian",
    "language.en": "English",
  },
};

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Set default language to Indonesian
  const [language, setLanguageState] = useState<Language>("id");

  // Check if browser storage has language preference on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage && (storedLanguage === "id" || storedLanguage === "en")) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Function to set language and store in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

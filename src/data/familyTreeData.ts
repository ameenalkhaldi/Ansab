export interface FamilyMember {
  id: string;
  name: string;
  fatherId?: string;
  birthYear?: number;
  deathYear?: number;
  biography?: string;
  tagline?: string; // <-- Add this line
  sources?: { label: string; url: string }[];
}

const familyTreeData: FamilyMember[] = [
  // Existing ancestors
  {
    id: "adnan",
    name: "Adnan",
    tagline: "Forefather of the Adnanite Arabs",
  },
  {
    id: "maad",
    name: "Ma'ad bin Adnan",
    fatherId: "adnan",
  },
  {
    id: "nizar",
    name: "Nizar bin Ma'ad",
    fatherId: "maad",
  },
  {
    id: "mudar",
    name: "Mudar bin Nizar",
    fatherId: "nizar",
  },
  {
    id: "ilyas",
    name: "Ilyas bin Mudar",
    fatherId: "mudar",
  },
  {
    id: "mudrikah",
    name: "Mudrikah bin Ilyas",
    fatherId: "ilyas",
  },
  {
    id: "khuzaymah",
    name: "Khuzaymah bin Mudrikah",
    fatherId: "mudrikah",
  },
  {
    id: "kinanah",
    name: "Kinanah bin Khuzaymah",
    fatherId: "khuzaymah",
  },
  {
    id: "nadr",
    name: "An-Nadr bin Kinanah",
    fatherId: "kinanah",
    tagline: "Also known as Quraysh, founder of the Quraysh tribe",
  },
  {
    id: "malik",
    name: "Malik bin An-Nadr",
    fatherId: "nadr",
  },
  {
    id: "fihr",
    name: "Fihr bin Malik",
    fatherId: "malik",
    tagline: "Also known as Quraysh, the tribe was named after him",
  },
  {
    id: "ghalib",
    name: "Ghalib bin Fihr",
    fatherId: "fihr",
  },
  {
    id: "luhayy",
    name: "Lu'ayy bin Ghalib",
    fatherId: "ghalib",
  },
  {
    id: "kaab",
    name: "Ka'ab bin Lu'ayy",
    fatherId: "luhayy",
  },
  {
    id: "murrah",
    name: "Murrah bin Ka'ab",
    fatherId: "kaab",
  },
  {
    id: "kilab",
    name: "Kilab bin Murrah",
    fatherId: "murrah",
  },
  {
    id: "qusayy",
    name: "Qusayy bin Kilab",
    fatherId: "kilab",
    tagline: "Unified the Quraysh and established the custodianship of the Kaaba",
  },
  {
    id: "abd-manaf",
    name: "Abd Manaf bin Qusayy",
    fatherId: "qusayy",
  },
  {
    id: "hashim",
    name: "Hashim bin Abd Manaf",
    fatherId: "abd-manaf",
    birthYear: 464,
    deathYear: 497,
    tagline: "Great-grandfather of Prophet Muhammad ﷺ",
  },

  // Sons of Hashim
  {
    id: "abdul-muttalib",
    name: "Abdul-Muttalib bin Hashim",
    fatherId: "hashim",
    birthYear: 497,
    deathYear: 578,
    tagline: "Grandfather of Prophet Muhammad ﷺ",
  },
  {
    id: "asad",
    name: "Asad bin Hashim",
    fatherId: "hashim",
  },
  {
    id: "abu-sayfi",
    name: "Abu Sayfi bin Hashim",
    fatherId: "hashim",
  },
  {
    id: "nadla",
    name: "Nadla bin Hashim",
    fatherId: "hashim",
  },

  // Sons of Abdul-Muttalib (next generation)
  {
    id: "al-harith",
    name: "Al-Harith bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    tagline: "Eldest son of Abdul-Muttalib",
  },
  {
    id: "abu-talib",
    name: "Abu Talib bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    birthYear: 539,
    deathYear: 619,
    tagline: "Uncle of Prophet Muhammad ﷺ and father of Ali",
  },
  {
    id: "al-zubayr",
    name: "Al-Zubayr bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    tagline: "Poet and uncle of the Prophet",
  },
  {
    id: "abdullah",
    name: "Abdullah bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    birthYear: 546,
    deathYear: 570,
    tagline: "Father of Prophet Muhammad ﷺ",
  },
  {
    id: "abu-lahab",
    name: "Abu Lahab bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    deathYear: 624,
    tagline: "Given name was Abdul-Uzza",
  },
  {
    id: "al-abbas",
    name: "Al-Abbas bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    birthYear: 568,
    deathYear: 653,
    tagline: "Founder of Abbasid dynasty lineage",
  },
  {
    id: "hamza",
    name: "Hamza bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    birthYear: 568,
    deathYear: 625,
    tagline: "Lion of Allah, martyred at Uhud",
  },
  {
    id: "al-muqawwim",
    name: "Al-Muqawwim bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
  },
  {
    id: "hajl",
    name: "Hajl bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    tagline: "Also known as Al-Ghaydaq",
  },
  {
    id: "dirar",
    name: "Dirar bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
  },
  {
    id: "qutham",
    name: "Qutham bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
  },
  {
    id: "al-ghaydaq",
    name: "Al-Ghaydaq bin Abdul-Muttalib",
    fatherId: "abdul-muttalib",
    tagline: "Known for his generosity",
  },

  // The Prophet
    {
    id: "prophet",
    name: "Muhammad ﷺ",
    birthYear: 570,
    deathYear: 632,
    fatherId: "abdullah",
    tagline: "Master of the two universes.",
  },

  // SONS OF ABU TALIB
  {
    id: "talib",
    name: "Talib bin Abi Talib",
    fatherId: "abu-talib",
  },
  {
    id: "aqil",
    name: "Aqil bin Abi Talib",
    fatherId: "abu-talib",
    deathYear: 680,
    tagline: "Fought at Jamal and Siffin with Ali",
  },
  {
    id: "jafar",
    name: "Ja'far bin Abi Talib",
    fatherId: "abu-talib",
    birthYear: 590,
    deathYear: 629,
    tagline: "Martyred at Mu'tah, 'Jafar at-Tayyar'",
  },
  {
    id: "ali",
    name: "Ali bin Abi Talib",
    fatherId: "abu-talib",
    birthYear: 601,
    deathYear: 661,
    tagline: "4th Caliph, cousin of the Prophet ﷺ",
  },
  
  // Sons of Ali (RA)
    {
    id: "hasan",
    name: "al-Hasan bin Ali",
    fatherId: "ali",
    birthYear: 625,
    deathYear: 670,
    tagline: "5th Caliph, Grandson of the Prophet ﷺ",
  },
    {
    id: "husayn",
    name: "al-Husayn bin Ali",
    fatherId: "ali",
    birthYear: 626,
    deathYear: 680,
    tagline: "Grandson of the Prophet ﷺ. Martyred at Karbala",
  },
    {
    id: "Muhsin",
    name: "al-Muhsin bin Ali",
    fatherId: "ali",
    birthYear: 632,
    deathYear: 632,
    tagline: "Grandson of the Prophet ﷺ. Died in Infancy",
  },
    {
    id: "abbasbinali",
    name: "al-Abbas bin Ali",
    fatherId: "ali",
    birthYear: 645,
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "abdallahbinali",
    name: "Abdullah bin Ali",
    fatherId: "ali",
    birthYear: 646,
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "jaafarbinali",
    name: "Ja'far bin Ali",
    fatherId: "ali",
    birthYear: 647,
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "uthmanbinali",
    name: "'Uthman bin Ali",
    fatherId: "ali",
    birthYear: 647,
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "umarbinali",
    name: "'Umar bin Ali",
    fatherId: "ali",
    birthYear: 634,
    deathYear: 680,
    tagline: "Son of Ali. Attended Karbala",
  },
    {
    id: "abubakrbinali",
    name: "'Abu Bakr bin Ali",
    fatherId: "ali",
    birthYear: 659,
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "ubaydullah-ali",
    name: "''Ubaydullah' bin Ali",
    fatherId: "ali",
    deathYear: 687,
    tagline: "Son of Ali. Died in al-Madhar fighting with Musab bin Zubayr",
  },
    {
    id: "muhammadakbar",
    name: "Muhammad bin al-Hanafiyya",
    fatherId: "ali",
    birthYear: 635,
    deathYear: 700,
    tagline: "Senior son of Ali",
  },
    {
    id: "muhammadawsat",
    name: "Muhammad al-Awsat",
    fatherId: "ali",
    deathYear: 680,
    tagline: "Son of Ali. Martyred at Karbala",
  },
    {
    id: "muhammadasghar",
    name: "Muhammad al-Asghar",
    fatherId: "ali",
    deathYear: 680,
    tagline: "Son of Ali. Likely Martyred at Karbala",
  },
  // SONS OF AL-HARITH (eldest son of Abdul-Muttalib)
  {
    id: "abu-sufyan-harith",
    name: "Abu Sufyan bin Al-Harith",
    fatherId: "al-harith",
    deathYear: 652,
    tagline: "Initially opposed Islam, later converted",
  },
  {
    id: "nawfal-harith",
    name: "Nawfal bin Al-Harith",
    fatherId: "al-harith",
  },
  {
    id: "rabbab-harith",
    name: "Rabbab bin Al-Harith",
    fatherId: "al-harith",
  },
  // SONS OF AL-ZUBAYR
  {
    id: "abdullah-zubayr",
    name: "Abdullah bin Al-Zubayr",
    fatherId: "al-zubayr",
    tagline: "Companion of the Prophet. Not to be confused with Abdullah bin Al-Zubayr bin al-Awwam",
  },
  {
    id: "khadij-zubayr",
    name: "Khadij bin Al-Zubayr",
    fatherId: "al-zubayr",
  },

  // SONS OF AL-ABBAS
  {
    id: "fadl-abbas",
    name: "Al-Fadl bin Al-Abbas",
    fatherId: "al-abbas",
    deathYear: 639,
    tagline: "Companion of the Prophet",
  },
  {
    id: "abdullah-abbas",
    name: "Abdullah bin Al-Abbas",
    fatherId: "al-abbas",
    birthYear: 619,
    deathYear: 687,
    tagline: "Great scholar, known as 'Ibn Abbas'",
  },
  {
    id: "ubaydullah-abbas",
    name: "Ubaydullah bin Al-Abbas",
    fatherId: "al-abbas",
  },
  {
    id: "qutham-abbas",
    name: "Qutham bin Al-Abbas",
    fatherId: "al-abbas",
    tagline: "Companion of the Prophet",
  },

  // SONS OF HAMZA
  {
    id: "amara-hamza",
    name: "Amara bin Hamza",
    fatherId: "hamza",
  },
  {
    id: "yaala-hamza",
    name: "Ya'la bin Hamza",
    fatherId: "hamza",
  },
  {
    id: "umar-hamza",
    name: "Umar bin Hamza",
    fatherId: "hamza",
  },

  // SONS OF ABU LAHAB
  {
    id: "utba-abu-lahab",
    name: "Utbah bin Abi Lahab",
    fatherId: "abu-lahab",
  },
  {
    id: "utayba-abu-lahab",
    name: "Utaybah bin Abi Lahab",
    fatherId: "abu-lahab",
    tagline: "Known for divorcing Ruqayyah (Prophet's daughter)",
  },
  {
    id: "muattab-abu-lahab",
    name: "Mu'attab bin Abi Lahab",
    fatherId: "abu-lahab",
  },

  // SONS OF AL-MUQAWWIM
  {
    id: "abdullah-muqawwim",
    name: "Abdullah bin Al-Muqawwim",
    fatherId: "al-muqawwim",
  },

  // SONS OF HAJL (AL-GHAYDAQ)
  {
    id: "awfa-hajl",
    name: "Al-Awfa bin Hajl",
    fatherId: "hajl",
  },
  // Sons of Hasan bin Ali 
  {
    id: "hasanbinhasan",
    name: "al-Hasan bin al-Hasan",
    fatherId: "hasan",
    birthYear: 637,
    deathYear: 715,
    tagline: "'al-Muthanna'. Grandson of Ali and master of Abu Talibs household in his time"
  },
    {
    id: "zaydbinhasan",
    name: "Zayd bin al-Hasan",
    fatherId: "hasan",
    birthYear: 637,
    deathYear: 715,
    tagline: "Grandson of Ali. Lived and died in Medina"
  },
    {
    id: "amrubinhasan",
    name: "Amru bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His Progeny ended with his son"
  }, 
      {
    id: "muhammadbinamru",
    name: "Muhammad bin Amru",
    fatherId: "amrubinhasan",
    deathYear: 718,
    tagline: "Muhaddith. His line ended with him"
  },
    {
    id: "husaynbinhasan",
    name: "al-Husayn bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. Known as 'al-Athram'"
  },
      {
    id: "qasimbinhasan",
    name: "al-Qasim bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him. Martyred at Karbala."
  },
      {
    id: "abubakrbinhasan",
    name: "Abu Bakr bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him. Martyred at Karbala."
  },
    {
    id: "talhahbinhasan",
    name: "Talhah bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him"
  },
    {
    id: "abdulrahman-hasan",
    name: "Abdul-Rahman bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },
    {
    id: "abdullah-hasan",
    name: "Abdullah bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },
    {
    id: "muhammad-hasan",
    name: "Muhammad al-Akbar bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },
    {
    id: "muhammadakbarhasan",
    name: "Muhammad al-Asghar bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },
    {
    id: "jafar-hasan",
    name: "Ja'far bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },
    {
    id: "hamzah-hasan",
    name: "Abdul-Rahman bin al-Hasan",
    fatherId: "hasan",
    tagline: "Grandson of Ali. His line ended with him."
  },

  //Sons of Zayd bin Hasan bin Ali
    {
    id: "hasan-zayd",
    name: "al-Hasan bin Zayd",
    fatherId: "zaydbinhasan",
    birthYear: 703,
    deathYear: 783,
    tagline: "Emir of Medina under Abu-Ja'far al-Mansur the 2nd Abbasid Caliph. First to wear black from the sons of Ali"
  },
    {
    id: "muhammad-zayd",
    name: "Muhammad bin Zayd",
    fatherId: "zaydbinhasan",
    deathYear: 680,
    tagline: "Martyred at Karbala. His line ended with him."
  },
    {
    id: "yahya-zayd",
    name: "Yahya bin Zayd",
    fatherId: "zaydbinhasan",
    tagline: "His line ended with him."
  },
    {
    id: "husayn-zayd",
    name: "al-Husayn bin Zayd",
    fatherId: "zaydbinhasan",
  },
    {
    id: "muhammad-husayn-zayd",
    name: "Muhammad bin al-Husayn bin Zayd",
    fatherId: "husayn-zayd",
  },
        {
    id: "ahmadsammak",
    name: "Ahmad al-Sammak bin Muhammad bin al-Husayn bin Zayd",
    fatherId: "muhammad-husayn-zayd",
    tagline: 'The progeny of his grandfather al-Husayn ends with him.'
  },

// Sons of al-Hasan bin Zayd bin al-Hasan bin Ali
    {
    id: "ibrahim-hasan",
    name: "Ibrahim bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
      {
    id: "ismail-hasan",
    name: "Ismail bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
      {
    id: "ishaaq-hasan",
    name: "Ishaaq bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
      {
    id: "abdullah-hasan-zayd",
    name: "Abdullah bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
      {
    id: "ali-hasan-zayd",
    name: "Ali bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
      {
    id: "hasan-hasan-zayd",
    name: "al-Hasan bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
    tagline: "Mentioned by bin Hazm"
  },
    {
    id: "qasim-hasan",
    name: "al-Qasim bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
  },
    {
    id: "muhammad-hasan-zayd",
    name: "Muhammad bin Hasan bin Zayd",
    fatherId: "hasan-zayd",
    tagline: "His line ended with him."
  },

// Sons of al-Qasim bin Hasan bin Zayd bin Hasan bin Ali
    {
    id: "000001",
    name: "Muhammad al-Bathani",
    fatherId: "qasim-hasan",
  },
//to be finished


// Sons Muhammad al-Bathani
    {
    id: "0001001",
    name: "Muhammad al-Bathani",
    fatherId: "qasim-hasan",
  },


// Sons of al-Hasan al-Muthanna
     {
    id: "1000001",
    name: "Ja'far bin al-Hasan",
    fatherId: "hasanbinhasan",
  },
      {
    id: "1000002",
    name: "Dawood bin al-Hasan",
    fatherId: "hasanbinhasan",
  },
      {
    id: "1000003",
    name: "Ibrahim bin al-Hasan",
    fatherId: "hasanbinhasan",
  },
    {
    id: "1000004",
    name: "al-Hasan bin al-Hasan",
    fatherId: "hasanbinhasan",
    tagline: "al-Hasan 'al-Muthallath' (the Third)"
  },
    {
    id: "1000005",
    name: "Abdullah al-Kamil",
    fatherId: "hasanbinhasan",
    birthYear: 689,
    deathYear: 762,
    tagline: "Was imprisoned by the Abbasids, his sons known for their revolutions."
  }, 
// Sons of Abdullah Al Kamil
    {
    id: "1000006",
    name: "Muhammad al-Nafs al-Zakiyya",
    fatherId: "1000005",
    birthYear: 718,
    deathYear: 762,
    tagline: "'The Pure Soul'. Revolted against Abbasids in Medina and was killed."
  }, 
    {
    id: "1000007",
    name: "Ibrahim bin Abdullah al-Kamil",
    fatherId: "1000005",
    birthYear: 715,
    deathYear: 762,
    tagline: "Revolted with his brother Muhammad."
  }, 
    {
    id: "1000008",
    name: "Idris bin Abdullah al-Kamil",
    fatherId: "1000005",
    birthYear: 743,
    deathYear: 793,
    tagline: "Revolted with the Alids in 786. Survived al-Fakh and fled the Abbasids to Morocco and founded the Idrisid Kingdom there."
  }, 
    {
    id: "1000009",
    name: "Yahya bin Abdullah al-Kamil",
    fatherId: "1000005",
    birthYear: 745,
    deathYear: 762,
    tagline: "Revolted against the Abbasids in Daylam. Was forced to surrender and died imprisoned by Harun al-Rashid."
  },
    {
    id: "1000010",
    name: "Sulayman bin Abdullah al-Kamil",
    fatherId: "1000005",
    birthYear: 730,
    deathYear: 814,
    tagline: "May have been killed in al-Fakh or survived and fled to Tlemcen, either way is the ancestor of the Sulaymanids in Tlemcen"
  },
    {
    id: "10000011",
    name: "Musa bin Abdullah al-Kamil",
    fatherId: "1000005",
    birthYear: 748,
    deathYear: 797,
    tagline: "Musa al-Jawn. Pious and knowledgeable. Prevented from narrating Hadith by the authorities. Ancestor of the Ukhaidiri Dynasty. "
  },
      {
    id: "10000012",
    name: "'Isa' bin Abdullah al-Kamil",
    fatherId: "1000005",
    tagline: "His line ended with him."
  }, 
// Line of al-Nafs al-Zakiyya  
    {
    id: "2000001",
    name: "Abdullah bin al-Nafs al-Zakiyya",
    fatherId: "1000006",
    birthYear: 720,
    deathYear: 768,
    tagline: "Known as 'al-Ashtar'. All surviving progeny of al-Nafs al-Zakiyya is through him."
  },
    {
    id: "2000002",
    name: "al-Tahir bin al-Nafs al-Zakiyya",
    fatherId: "1000006",
    tagline: "Killed in al-Fakh with his father. His line ended with him"
  },        
    {
    id: "2000003",
    name: "al-Hasan bin al-Nafs al-Zakiyya",
    fatherId: "1000006",
    tagline: "Killed in al-Fakh with his father. His line ended with him"
  },
    {
    id: "2000004",
    name: " Ali bin al-Nafs al-Zakiyya",
    fatherId: "1000008",
    tagline: "His line ended with him."
  },
    {
    id: "2000005",
    name: "Ahmad bin al-Nafs al-Zakiyya",
    fatherId: "1000008",
    tagline: "Existence disputed. His line ended with him either way."
  },                 
    {
    id: "2000006",
    name: "Ibrahim bin al-Nafs al-Zakiyya",
    fatherId: "1000008",
    tagline: "Existence disputed. His line ended with him either way."
  }, 
    {
    id: "200007",
    name: "Muhammad al-A'war bin Abdullah al-Ashtar",
    fatherId: "2000001",
  },
    {
    id: "200008",
    name: "Hasan al-A'war bin Muhammad al-A'war",
    fatherId: "200007",
    tagline: "Naqib of the Ashraf in Kufa."
  },
      {
    id: "200009",
    name: "Ali bin Muhammad al-A'war",
    fatherId: "200007",
    tagline: "His line ended with him."
  },
// Sons of Hasan bin Muhammad bin Abdullah al-Ashtar bin Muhammad al-Nafs al-Zakiyya
      {
    id: "2000010",
    name: "Husayn bin Hasan al-A'war",
    fatherId: "200008",
    tagline: "Lived in a-Kufa."
  },
      {
    id: "2000011",
    name: "Ali bin Husayn",
    fatherId: "2000010",
    tagline: "Lived in a-Kufa."
  },
        {
    id: "2000012",
    name: "Abu Talib al-Husayn bin Ali",
    fatherId: "2000011",
    tagline: "Lived in a-Kufa. Was a person of leadership."
  },
    {
    id: "2000013",
    name: "Abdullah bin Hasan al-A'war",
    fatherId: "200008",
    tagline: "From the people of knowledge. Has progeny in Gorgan, Nisapur, Bukhara, Rayy, and Tabaristan."
  },
    {
    id: "2000014",
    name: "al-Qasim bin Abdullah",
    fatherId: "2000013",
  },
    {
    id: "2000015",
    name: "al-Hasan bin al-Qasim",
    fatherId: "2000014",
  },                   
    {
    id: "2000017",
    name: "Ahmad bin al-Hasan",
    fatherId: "2000015",
  },
    {
    id: "2000018",
    name: "al-Hasan bin Ahmad",
    fatherId: "2000017",
  }, 
    {
    id: "2000019",
    name: "Abu Ja'far Haydar bin al-Hasan",
    fatherId: "2000018",
    tagline: "Lived in Chalus in Tabaristan, was from the people of knowledge."
  },
    {
    id: "2000020",
    name: "Muhammad bin al-Hasan al-A'war",
    fatherId: "200008",
    tagline: "Has progeny in Wasit, Basra, Hamadan."
  },
    {
    id: "2000021",
    name: "Ali bin Muhammad",
    fatherId: "2000020",
  },
    {
    id: "2000022",
    name: "al-Husayn bin Ali",
    fatherId: "2000021",
  },
    {
    id: "2000023",
    name: "Ali bin al-Husayn",
    fatherId: "2000022",
  },
    {
    id: "2000024",
    name: "al-Hasan bin Ali",
    fatherId: "2000023",
  },
    {
    id: "2000025",
    name: "Ali bin al-Husayn",
    fatherId: "2000024",
  },
    {
    id: "2000026",
    name: "al-Husayn bin al-Hasan",
    fatherId: "2000025",
  },                    
    {
    id: "2000027",
    name: "Abu Talib Ali bin al-Husayn",
    fatherId: "2000026",
    tagline: "Lived in Hamadan. Was a Alim, Muhaddith, and Writer."
  },


//Sons of Ibrahim bin Abdullah Al-Kamil
    {
    id: "30001",
    name: "al-Hasan bin Ibrahim",
    fatherId: "1000007",
    tagline: "The Progeny of Ibrahim bin Abdullah are through al-Hasan."
  },
    {
    id: "30002",
    name: "Ahmad bin Ibrahim",
    fatherId: "1000007",
  },
    {
    id: "30003",
    name: "Ali bin Ibrahim",
    fatherId: "1000007",
  },
    {
    id: "30004",
    name: "Abdullah bin al-Hasan ",
    fatherId: "30001",
    tagline: "Progeny of al-Hasan bin Ibrahim are all through his son Abdullah."
  },
    {
    id: "30005",
    name: "Muhammad al-Hijazi bin Abdullah ",
    fatherId: "30004",
    tagline: "Has progeny in the Hijaz and Baghdad."
  },
    {
    id: "30006",
    name: "Ibrahim al-Azraq bin Abdullah ",
    fatherId: "30004",
    tagline: "Has progeny in Yanbu'."
  },
    {
    id: "30007",
    name: "Ibrahim bin Muhammad al-Hijazi",
    fatherId: "30005",
  },
    {
    id: "30008",
    name: "Ahmad al-Ahzam bin Ibrahim",
    fatherId: "30007",
  },
    {
    id: "30009",
    name: "Muhammad bin Ahmad al-Ahzam",
    fatherId: "30008",
  },
    {
    id: "30010",
    name: "Ahmad bin Muhammad bin Ahmad al-Ahzam",
    fatherId: "30009",
    tagline: "Lived in Baghdad. Known as 'Sahib al-Khatam' (The Ring/Seal Carrier). Progeny knwown as Banu Sahib al-Khatam "
  },
   {
    id: "30011",
    name: "Muhammad al-Dareer bin Ahmad",
    fatherId: "300010",
    tagline: "Lived in Baghdad. Known as 'Sahib al-Khatam' (The Ring/Seal Carrier). Progeny knwown as Banu Sahib al-Khatam "
  },
   {
    id: "30012",
    name: "Dawood bin Ibrahim",
    fatherId: "30006",
    tagline: "Emir of Yanbu'"
  },
   {
    id: "30013",
    name: "Sulayman bin Dawood",
    fatherId: "30012",
    tagline: "Was a leader of his people."
  },       
// Sons of Abdullah bin Abbas RA
   {
    id: "7000",
    name: "al-Abbas bin Abdullah",
    fatherId: "abdullah-abbas",
    tagline: "Eldest of bin Abbas' sons. His line ended with his sons."
  },
   {
    id: "binabbas1",
    name: "Abdullah bin al-Abbas bin Abdullah",
    fatherId: "7000",
    tagline: "Line ended."
  },
   {
    id: "binabbas2",
    name: "'Awn bin al-Abbas bin Abdullah",
    fatherId: "7000",
    tagline: "Line ended."
  },
   {
    id: "binabbas3",
    name: "Muhammad bin al-Abbas bin Abdullah",
    fatherId: "7000",
    tagline: "Line ended."
  },          
     {
    id: "7001",
    name: "Muhammad bin Abdullah",
    fatherId: "abdullah-abbas",
    tagline: "His line ended with him."
  },
     {
    id: "7002",
    name: "al-Fadl bin Abdullah",
    fatherId: "abdullah-abbas",
    tagline: "His line ended with him."
  },
     {
    id: "7003",
    name: "Ubaydullah bin Abdullah",
    fatherId: "abdullah-abbas",
    tagline: "Ibn Hazm recorded his name as Abdul-Rahman. His line ended with him."
  },
    {
    id: "silayt",
    name: "Silayt bin Abdullah",
    fatherId: "abdullah-abbas",
    tagline: "Was banished by his father before being returned. His line eded with him."
  },           
   {
    id: "7004",
    name: "Ali bin Abdullah",
    fatherId: "abdullah-abbas",
    birthYear:660,
    deathYear: 736,
    tagline: "Youngest of bin Abbas' sons. All surviving progeny of bin Abbas is through him."
  },
   {
    id: "7005",
    name: "Muhammad 'al-Imam' bin Ali",
    fatherId: "7004",
    tagline: "First to start the Abbasid Dawah. Named 'Abu al-Khala'if' (Father of the Caliphs)."
  },
   {
    id: "7006",
    name: "'Isa bin Ali",
    fatherId: "7004",
    birthYear: 702,
    deathYear: 802,
    tagline: "Was placed Goveror of Persia by his nephew Abu Abbas."
  },  
   {
    id: "7007",
    name: "Dawood bin Ali",
    fatherId: "7004",
    deathYear: 750,
    tagline: "First Abbasid Governor of Medina."
  },
   {
    id: "7008",
    name: "Sulayman bin Ali",
    fatherId: "7004",
    birthYear: 702,
    deathYear: 759,
    tagline: "Abbasid Governor of Basra, the Bahrein, Oman under Abu Abbas"
  },
   {
    id: "7009",
    name: "Abdul-Samad bin Ali",
    fatherId: "7004",
    birthYear: 723,
    deathYear: 803,
    tagline: "Abbasid Governor of Jazira, Palestine, Mecca, Madina, and Taif at different times."
  },
   {
    id: "7010",
    name: "Saleh bin Ali",
    fatherId: "7004",
    birthYear: 714,
    deathYear: 768,
    tagline: "First Abbasid Governor of Egypt. Founded the city of Al-Askar."
  },
   {
    id: "7011",
    name: "Abdullah bin Ali",
    fatherId: "7004",
    birthYear: 721,
    deathYear: 764,
    tagline: "Leading figure in the Abbasid Revlution. Killed by his nephew al-Mansur."
  },
  {
    id: "70012",
    name: "Ahmad bin Ali",
    fatherId: "7004",
    tagline: "His line ended with him."
  },
  {
    id: "70013",
    name: "Bishr bin Ali",
    fatherId: "7004",
    tagline: "His line ended with him."
  },
  {
    id: "70014",
    name: "Mubshir bin Ali",
    fatherId: "7004",
    tagline: "His line ended with him."
  },      
   {
    id: "7012",
    name: "Abu-l Abbas Abullah al-Saffah",
    fatherId: "7005",
    birthYear: 721,
    deathYear: 754,
    tagline: "1st Abbasid Caliph. Turned the Abbasid Dawah into a State by taking peoples allegience in Kufa."
  },
   {
    id: "7013",
    name: "Abu Ja'far al-Mansur",
    fatherId: "7005",
    birthYear: 713,
    deathYear: 875,
    tagline: "2nd Abbasid Calip."
  },
   {
    id: "7014",
    name: "Muhammad bin al-Saffah",
    fatherId: "7012",
    deathYear: 766,
    tagline: "Briefly Governor of Basra under al-Mansur. Likely killed by al-Mansur. The line of his father ended with him"
  },                      
   {
    id: "7015",
    name: "Ibrahim 'al-Imam' bin Muhammad",
    fatherId: "7005",
    birthYear: 701,
    deathYear: 748,
    tagline: "Second Imam of the Abbasid Dawah in secret after his father. Ordered is family to place his brother Abu Abbas as successor an go to Kufa."
  },
 {
    id: "7016",
    name: "Yahya bin Muhammad",
    fatherId: "7005",
    tagline: "Said to be disobedient to his father."
  },
 {
    id: "abbasbinmuhammadalimam",
    name: "al-Abbas bin Muhammad",
    fatherId: "7005",
    birthYear: 738,
    deathYear: 802,
    tagline: "Youngest son of Muhammad. Emir of Medina, Mecca, the Hajj, and later Damascus"
  },
// Sons of Abbas bin Muhammad al-Imam  
 {
    id: "abbas7001",
    name: "Abdullah bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },     
 {
    id: "abbas7002",
    name: "Ubaydullah bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },
 {
    id: "abbas7003",
    name: "Saleh bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },
 {
    id: "abbas7004",
    name: "Abdul-Aziz bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },       
 {
    id: "abbas7005",
    name: "Ali bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  }, 
 {
    id: "abbas7006",
    name: "Ibrahim bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },
 {
    id: "abbas7007",
    name: "Yahya bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },  
 {
    id: "abbas7008",
    name: "Ishaaq bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },
 {
    id: "abbas7009",
    name: "Isma'eel bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },    
 {
    id: "abbas7010",
    name: "Abdul-Rahman bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },       
 {
    id: "abbas7011",
    name: "Abdul-Malik bin al-Abbas bin Muhammad",
    fatherId: "abbasbinmuhammadalimam",
  },  
 {
    id: "abbas7012",
    name: "Muhammad bin Abdullah bin al-Abbas bin Muhammad",
    fatherId: "abbas7001",
  },                   
 {
    id: "abbas7013",
    name: "Sulayman bin Muhammad bin Abdullah al-Abbasi",
    fatherId: "abbas7012",
  },  
 {
    id: "abbas7014",
    name: "Muhammad bin Sulayman bin Muhammad al-Abbasi",
    fatherId: "abbas7013",
  },  
 {
    id: "abbas7015",
    name: "Tammam bin Sulayman al-Abbasi",
    fatherId: "abbas7014",
  },  
 {
    id: "abbas7016",
    name: "Abdul-Aziz bin Muhammad al-Abbasi",
    fatherId: "abbas7012",
  },
 {
    id: "abbas7017",
    name: "Ayyub bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7016",
  },
 {
    id: "abbas7018",
    name: "al-Husayn bin Ayyub al-Abbasi",
    fatherId: "abbas7017",
  },
 {
    id: "abbas7019",
    name: "Abdullah bin Ubaydullah al-Abbasi",
    fatherId: "abbas7002",
  },   
 {
    id: "abbas7020",
    name: "Abdul-Aziz bin Abdullah bin Ubaydullah al-Abbasi",
    fatherId: "abbas7019",
  },   
 {
    id: "abbas7021",
    name: "al-Qasim bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7020",
  },   
{
    id: "abbas7022",
    name: "Hamzah bin al-Qasim bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7021",
  },    
 {
    id: "abbas7023",
    name: "Ibrahim bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7020",
  },  
 {
    id: "abbas7024",
    name: "Isma'eel bin Ibrahim bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7023",
  },  
  {
    id: "abbas7026",
    name: "al-Muttalib bin Ibrahim al-Abbasi",
    fatherId: "abbas7023",
  },
 {
    id: "abbas7027",
    name: "'Isa bin al-Muttalib al-Abbasi",
    fatherId: "abbas7026",
  },  
 {
    id: "abbas7028",
    name: "Harun bin 'Isa al-Abbasi",
    fatherId: "abbas7027",
  },   
 {
    id: "abbas7029",
    name: "Muhammad bin Harun al-Abbasi",
    fatherId: "abbas7028",
  }, 
 {
    id: "abbas7030",
    name: "Tammam bin Muhammad bin Harun al-Abbasi",
    deathYear: 1048,
    fatherId: "abbas7029",
  },   
 {
    id: "abbas7031",
    name: "Ibrahim bin Abdullah al-Abbasi",
    fatherId: "abbas7019",
  },       
 {
    id: "abbas7032",
    name: "Isma'eel bin Ibrahim bin Abdullah al-Abbasi",
    fatherId: "abbas7031",
  }, 
 {
    id: "abbas7033",
    name: "Abdul-Wahid bin Isma'eel al-Abbasi",
    fatherId: "abbas7032",
  },   
  {
    id: "abbas7034",
    name: "Muhammad bin Abdul-Wahid al-Abbasi",
    deathYear: 970,
    fatherId: "abbas7033",
  },  
 {
    id: "abbas7035",
    name: "'Isa bin Abdullah al-Abbasi",
    fatherId: "abbas7019",
  },                 
 {
    id: "abbas7036",
    name: "Muhammad bin 'Isa al-Abbasi",
    fatherId: "abbas7035",
  },  
 {
    id: "abbas7037",
    name: "Ahmad bin Muhammad al-Abbasi",
    fatherId: "abbas7036",
  }, 
 {
    id: "abbas7038",
    name: "Muhammad bin Ahmad bin Muhammad al-Abbasi",
    fatherId: "abbas7037",
  },           
 {
    id: "abbas7039",
    name: "Ahmad bin Muhammad bin Ahmad al-Abbasi",
    fatherId: "abbas7038",
  },                  
 {
    id: "abbas7040",
    name: "Mahmoud bin Ahmad al-Abbasi",
    fatherId: "abbas7039",
  },  
 {
    id: "abbas7041",
    name: "Hassoun bin Mahmoud al-Abbasi",
    fatherId: "abbas7040",
  },   
 {
    id: "abbas7042",
    name: "Hasan bin Hassoun al-Abbasi",
    fatherId: "abbas7041",
  },  
 {
    id: "abbas7043",
    name: "'Isa bin Hasan al-Abbasi",
    fatherId: "abbas7042",
  }, 
 {
    id: "abbas7044",
    name: "Muhammad bin 'Isa al-Abbasi",
    fatherId: "abbas7043",
  },         
// Sons of Abdul-Aziz bin al-Abbas bin Muhammad al-Imam
 {
    id: "abbas7045",
    name: "al-Hasan bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7004",
  },  
 {
    id: "abbas7046",
    name: "Muhammad bin al-Hasan bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7045",
  },       
 {
    id: "abbas7047",
    name: "Umar bin al-Hasan bin Abdul-Aziz al-Abbasi", ///// ?? pg 33
    fatherId: "abbas7045",
  },    
 {
    id: "abbas7048",
    name: "Abu Bakr bin al-Hasan bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7045",
  },              
 {
    id: "abbas7049",
    name: "Ali bin al-Hasan bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7045",
  },  
 {
    id: "abbas7050",
    name: "Uthman bin al-Hasan bin Abdul-Aziz al-Abbasi",
    fatherId: "abbas7045",
  },      
 {
    id: "abbas7051",
    name: "Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7047",
  },
 {
    id: "abbas7052",
    name: "Ahmad bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7051",
  },  
 {
    id: "abbas7053",
    name: "Yahya bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7051",
  },    
 {
    id: "abbas7054",
    name: "Muhammad bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7051",
  },    
 {
    id: "abbas7055",
    name: "Ja'far bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7051",
  },          
 {
    id: "abbas7056",
    name: "Ali bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7051",
  },  
 {
    id: "abbas7057",
    name: "Abdul-Samee' bin Ahmad bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7052",
  },  
 {
    id: "abbas7058",
    name: "Ibrahim bin Ahmad bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7052",
  },  
 {
    id: "abbas7059",
    name: "al-Hasan bin Ahmad bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7052",
  },            
 {
    id: "abbas7060",
    name: "Sulayman bin Ali bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7056",
  }, 
 {
    id: "abbas7061",
    name: "Isma'eel bin Ali bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7056",
  },                         
 {
    id: "abbas7062",
    name: "Muhammad bin Sulayman bin Ali al-Abbasi",
    fatherId: "abbas7060",
  }, 
 {
    id: "abbas7063",
    name: "Ja'far bin Sulayman bin Ali al-Abbasi",
    fatherId: "abbas7060",
  },
 {
    id: "abbas7064",
    name: "Ubaydullah bin Sulayman bin Ali al-Abbasi",
    fatherId: "abbas7060",
  }, 
 {
    id: "abbas7065",
    name: "Abdul-Kareem bin Yahya bin Abdul-Samee' bin Umar al-Abbasi",
    fatherId: "abbas7053",
  },        
 {
    id: "abbas7066",
    name: "Hashim bin Jafar bin Abdul-Samee' al-Abbasi",
    fatherId: "abbas7055",
  },   
// Sons of Isma'eel bin al-Abbas bin Yahya al-Imam
 {
    id: "abbas7067",
    name: "al-Hasan bin Isma'eel al-Abbasi",
    fatherId: "abbas7009",
  },
 {
    id: "abbas7068",
    name: "Ali bin al-Hasan al-Abbasi",
    fatherId: "abbas7067",
  },   
 {
    id: "abbas7069",
    name: "Ubaydullah bin Ali bin al-Hasan al-Abbasi",
    fatherId: "abbas7068",
  },        
 {
    id: "abbas7070",
    name: "Ishaaq bin al-Hasan al-Abbasi",
    fatherId: "abbas7067",
  },     
 {
    id: "abbas7071",
    name: "al-Fadl bin Ishaaq al-Abbasi",
    fatherId: "abbas7070",
  },     
// Sons of Abdul-Rahman bin al-Abbas bin Muhammad al-Imam
 {
    id: "abbas7072",
    name: "Abdullah bin Abdul-Rahman al-Abbasi",
    fatherId: "abbas7010",
  }, 
 {
    id: "abbas7073",
    name: "al-Abbas bin Abdullah bin Abdul-Rahman al-Abbasi",
    fatherId: "abbas7072",
  },           
 {
    id: "abbas7074",
    name: "Muhammad bin al-Abbas al-Abbasi",
    fatherId: "abbas7073",
  },
 {
    id: "abbas7075",
    name: "al-Abbas bin Muhammad bin Al-Abbas al-Abbasi",
    fatherId: "abbas7074",
  },  
 {
    id: "abbas7076",
    name: "al-Fadl bin al-Abbas bin Muhammad al-Abbasi",
    fatherId: "abbas7075",
  },          
 {
    id: "abbas7077",
    name: "al-Husayn bin al-Abbas bin Muhammad bin Al-Abbas al-Abbasi",
    fatherId: "abbas7076",
  },  
 {
    id: "abbas7078",
    name: "Ahmad bin al-Husayn bin al-Abbas al-Abbasi",
    fatherId: "abbas7077",
  },    
// Sons of Abdul-Malik bin al-Abbas bin Muhammad al-Imam
 {
    id: "abbas7079",
    name: "al-Fadl bin Abdul-Malik al-Abbasi",
    fatherId: "abbas7011",
  },     
 {
    id: "abbas7080",
    name: "Ahmad bin al-Fadl bin Abdul-Malik al-Abbasi",
    fatherId: "abbas7079",
  },                                          
// Sons of Yahya bin Muhammad al-Imam      
 {
    id: "7017",
    name: "Ibrahim bin Yahya",
    fatherId: "7016",
    tagline: "Massacred the people of Mosul. The line of his father ended with him."
  },   
// Sons of Ibrahim al-Imam
 {
    id: "ia7000",
    name: "Abdul-Wahhab bin Ibrahim",
    fatherId: "7015",
    deathYear: 875,
    tagline: "Died in Dimashq the same day as al-Mansur"
  },        


// Sons of al-Husayn 
 {
    id: "007000",
    name: "Ali al-Akbar bin al-Husayn",
    fatherId: "husayn",
    birthYear: 655,
    deathYear: 689,
    tagline: "Martyred in Karbala with his father. His line ended with him"
  }, 
 {
    id: "007001",
    name: "Ali Zayn al-Abideen",
    fatherId: "husayn",
    birthYear: 658,
    deathYear: 712,
    tagline: "Known as 'al-Sajjad."
  },    
 {
    id: "007002",
    name: "Abdullah bin al-Husayn",
    fatherId: "husayn",
    deathYear: 680,
    tagline: "Killed in Karbala. Died an Infant."
  },   
 {
    id: "007003",
    name: "Ja'far bin al-Husayn",
    fatherId: "husayn",
    tagline: "Named in some sources as Abu-Bakr. Died an Infant before Karbala."
  }, 
// Sons of Zayn al-Abideen
 {
    id: "007004",
    name: "Muhammad al-Baqir",
    fatherId: "007001",
    birthYear: 677,
    deathYear: 733,
    tagline: "A man of immense knowledge and narration. Born and Died in Medina"
  }, 
 {
    id: "007005",
    name: "Zayd 'al-Shaheed' bin Ali ",
    fatherId: "007001",
    birthYear: 695,
    deathYear: 740,
    tagline: "Lead a revolt against the Ummayads and fell. Zaydiyya Shia named after him"
  },
 {
    id: "007006",
    name: "Abdullah 'al-Bahir' bin Ali",
    fatherId: "007001",
    birthYear: 694,
    deathYear: 747,
    tagline: "Born and Died in Medina. Narrated Hadith from his family."
  },
 {
    id: "007007",
    name: "al-Husayn bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "Born and Died in Medina. Narrated Hadith from his family."
  }, 
{
    id: "007008",
    name: "Umar al-Ashraf bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "Born and Died in Medina. Narrated Hadith from his family."
  },     
 {
    id: "007009",
    name: "Ali bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "Born and Died in Medina. Narrated Hadith from his family."
  },  
 {
    id: "0007009",
    name: "al-Husayn al-Akbar bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "Eldest child. His line ended with him."
  },     
 {
    id: "0007010",
    name: "Abdul-Rahman bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },    
 {
    id: "0007011",
    name: "Muhammad al-Asghar bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },       
 {
    id: "0007012",
    name: "Abdul-Rahman bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },   
 {
    id: "0007013",
    name: "'Isa bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },     
 {
    id: "0007014",
    name: "Sulayman bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },  
 {
    id: "0007015",
    name: "Abdullah al-Asghar bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },   
 {
    id: "0007016",
    name: "Dawood bin Ali al-Sajjad",
    fatherId: "007001",
    tagline: "His line ended with him."
  },       
//Sons of Abdullah bin Ali al-Sajjad
 {
    id: "007010",
    name: "Ishaaq bin Abdullah bin Ali al-Sajjad",
    fatherId: "007006",
  },  
 {
    id: "007011",
    name: "Muhammad bin Abdullah bin Ali al-Sajjad",
    fatherId: "007006",
  },  
// Sons of Umar bin Ali al-Sajjad
 {
    id: "007012",
    name: "Muhammad bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },
 {
    id: "007013",
    name: "Isma'eel bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },    
 {
    id: "007014",
    name: "Musa bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },    
 {
    id: "007015",
    name: "Abdullah bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },    
 {
    id: "007016",
    name: "Ali bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },
 {
    id: "007017",
    name: "al-Husayn bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },   
 {
    id: "007018",
    name: "Ja'far bin Umar bin Ali al-Sajjad",
    fatherId: "007008",
  },   
// Sons of Muhammad al-Baqir
 {
    id: "007019",
    name: "Ja'far al-Sadiq",
    fatherId: "007004",
  },
 {
    id: "007020",
    name: "Abdullah bin Muhammad al-Baqir",
    fatherId: "007004",
    tagline: "His line ended with him."
  },
 {
    id: "007021",
    name: "Ibrahim bin Muhammad al-Baqir",
    fatherId: "007004",
    tagline: "His line ended with him."

  },  
 {
    id: "007022",
    name: "Ubaydullah bin Muhammad al-Baqir",
    fatherId: "007004",
    tagline: "His line ended with him."
    
  },      
 {
    id: "007023",
    name: "Ali bin Muhammad al-Baqir",
    fatherId: "007004",
    tagline: "His line ended with him."
  },   
// Sons of Ja'far al-Sadiq
 {
    id: "007024",
    name: "Musa al-Kadhim bin Ja'far al-Sadiq ",
    fatherId: "007019",
  },
 {
    id: "007025",
    name: "Isma'eel al-A'raj bin Ja'far al-Sadiq ",
    fatherId: "007019",  
  },                   
 {
    id: "007026",
    name: "Muhammad al-Deebaj bin Ja'far al-Sadiq ",
    fatherId: "007019",
    deathYear: 818, 
    tagline: "Claimed a failed revolt for the Caliphate in Mecca."
  },    
 {
    id: "007027",
    name: "Ishaaq al-Mu'taman bin Ja'far al-Sadiq ",
    fatherId: "007019",
    tagline: "An ascetic Narrator and Scholar, his appearance was like that of the Messenger ﷺ."
  }, 
 {
    id: "007028",
    name: "Ali bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "Lived till the time of al-Hasan al-Askari."
  },        
 {
    id: "007029",
    name: "Abdullah al-Aftah bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },   
 {
    id: "007030",
    name: "al-Hasan bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },   
 {
    id: "007031",
    name: "Muhammad al-Asghar bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },    
 {
    id: "007032",
    name: "al-Abbas bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  }, 
 {
    id: "007033",
    name: "Yahya bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },   
 {
    id: "007034",
    name: "Ubaydullah bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },
  {
    id: "007035",
    name: "al-Muhsin bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  }, 
 {
    id: "007036",
    name: "'Isa bin Ja'far al-Sadiq ",
    fatherId: "007019",  
    tagline: "His line ended with him."
  },  
//Sons of Musa al-Kathim  
 {
    id: "007037",
    name: "Ali al-Ridha",
    fatherId: "007024",  
    birthYear: 766,
    deathYear: 818,
    tagline: "Was made the Heir to the Caliphate by al-Ma'mun."
  },  
 {
    id: "007038",
    name: "Ibrahim al-Asghar bin Musa al-Kadhim",
    fatherId: "007024",  
  },  
 {
    id: "007039",
    name: "al-Abbas bin Musa al-Kadhim",
    fatherId: "007024",  
  },   
 {
    id: "007040",
    name: "Isma'eel bin Musa al-Kadhim",
    fatherId: "007024",  
  },   
 {
    id: "007041",
    name: "Muhammad bin Musa al-Kadhim",
    fatherId: "007024",  
  },   
 {
    id: "007042",
    name: "Abdullah bin Musa al-Kadhim",
    fatherId: "007024",  
  },
 {
    id: "007043",
    name: "Ubaydullah bin Musa al-Kadhim",
    fatherId: "007024",  
  },    
 {
    id: "007044",
    name: "al-Hasan bin Musa al-Kadhim",
    fatherId: "007024",  
  },      
 {
    id: "007045",
    name: "Ja'far bin Musa al-Kadhim",
    fatherId: "007024",  
  },    
 {
    id: "007046",
    name: "Ibrahim al-Akbar bin Musa al-Kadhim", //progeny diferred upon
    fatherId: "007024",  
  },      
 {
    id: "007047",
    name: "al-Husayn bin Musa al-Kadhim", //progeny diferred upon
    fatherId: "007024",  
  },   
 {
    id: "007048",
    name: "Zayd al-Naar bin Musa al-Kadhim", //progeny diferred upon
    fatherId: "007024", 
    tagline: "Participated in an unsuccessful revolt of Abu-l Saraya." 
  },  
 {
    id: "007049",
    name: "Harun bin Musa al-Kadhim", //progeny diferred upon
    fatherId: "007024", 
  },
 {
    id: "007050",
    name: "Ahmad bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },     
 {
    id: "007051",
    name: "Ja'far al-Akbar bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },    
 {
    id: "007052",
    name: "Dawood bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  }, 
 {
    id: "007053",
    name: "Muhammad bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },       
 {
    id: "007054",
    name: "Sulayman bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },   
 {
    id: "007055",
    name: "Yahya bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },  
 {
    id: "007056",
    name: "al-Fadl bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  }, 
 {
    id: "007057",
    name: "Ali bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },     
 {
    id: "007058",
    name: "Abdul-Rahman bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },   
 {
    id: "007059",
    name: "al-Qasim bin Musa al-Kadhim", 
    fatherId: "007024", 
    tagline: "His line ended with him."
  },    
// Sons of Ali al-Ridha
 {
    id: "007060",
    name: "Muhammad al-Jawad", 
    fatherId: "007037", 
    birthYear: 810,
    deathYear: 835,
    tagline: "Also known as al-Taqi."
  }, 
 {
    id: "007061",
    name: "al-Hasan bin Ali al-Ridha", 
    fatherId: "007037", 
 },  
 {
    id: "007062",
    name: "Ali bin Ali al-Ridha", 
    fatherId: "007037", 
 },  
 {
    id: "007063",
    name: "al-Husayn bin Ali al-Ridha", 
    fatherId: "007037", 
 },  
 {
    id: "007064",
    name: "Musa bin Ali al-Ridha", 
    fatherId: "007037", 
 },  
//Sons of Muhammad al-Jawad/al-Taqi
{
    id: "007065",
    name: "Ali al-Hadi", 
    fatherId: "007060", 
    birthYear: 828,
    deathYear: 868,
    tagline: "Also known as al-Naqi."
 },  
{
    id: "007066",
    name: "Musa 'al-Mubarqa'", 
    fatherId: "007060", 
 },  
{
    id: "007067",
    name: "Yahya bin Muhammad al-Jawad", 
    fatherId: "007060", 
    tagline: "His line ended with him."
 }, 
//sons of Ali Al Hadi
{
    id: "007068",
    name: "al-Hasan al-Askari", 
    fatherId: "007065", 
 }, 
{
    id: "007069",
    name: "Ja'far al-Tawwab", 
    fatherId: "007065", 
    tagline: "Known by the twelvers as 'the Liar' for denying their 12th Imam. Father of 120 children"
 },  
{
    id: "007070",
    name: "al-Husayn bin Ali al-Hadi", 
    fatherId: "007065",
    tagline: "His line ended with him."  
 },  
{
    id: "007071",
    name: "Musa bin Ali al-Hadi", 
    fatherId: "007065", 
    tagline: "His line ended with him."  
 },   
{
    id: "007072",
    name: "Muhammad bin Ali al-Hadi", 
    fatherId: "007065", 
    tagline: "The eldest son. His line ended with him."  
 },   
{
    id: "007073",
    name: "Ali bin Ali al-Hadi", 
    fatherId: "007065", 
    tagline: "His line ended with him."      
 },   
// Sons of al-Hasan al-Askari
{
    id: "007074",
    name: "Muhammad bin al-Hasan al-Askari", 
    fatherId: "007068", 
    tagline: "His line ended with him."      
 },  
{
    id: "007075",
    name: "Musa bin al-Hasan al-Askair", 
    fatherId: "007068", 
    tagline: "Died during his fatherHis line ended with him."      
 },  
// Sons of Ja'far al-Tawwab
{
    id: "007076",
    name: "Muhammad bin al-Hasan al-Askari", 
    fatherId: "007069", 
    
 },  
];



export default familyTreeData;

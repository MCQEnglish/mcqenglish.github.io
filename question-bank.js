(() => {
  "use strict";

  const TOTAL_QUESTIONS = 100000;

  const vocabulary = [
    ["abundant", "plentiful", "scarce", "available in large quantities"],
    ["accurate", "precise", "incorrect", "free from error"],
    ["adverse", "unfavorable", "beneficial", "harmful or unfavorable"],
    ["ancient", "old", "modern", "belonging to a very distant past"],
    ["apparent", "obvious", "hidden", "clearly visible or understood"],
    ["brief", "concise", "lengthy", "using few words"],
    ["calm", "peaceful", "agitated", "free from excitement or disturbance"],
    ["candid", "frank", "deceitful", "truthful and straightforward"],
    ["cautious", "careful", "reckless", "careful to avoid danger"],
    ["complex", "complicated", "simple", "consisting of many connected parts"],
    ["concur", "agree", "disagree", "to have the same opinion"],
    ["diligent", "hardworking", "lazy", "showing careful and persistent effort"],
    ["diminish", "reduce", "increase", "to make or become smaller"],
    ["eager", "keen", "reluctant", "strongly wanting to do something"],
    ["elated", "joyful", "depressed", "extremely happy and excited"],
    ["eminent", "distinguished", "unknown", "famous and respected"],
    ["expand", "enlarge", "contract", "to become or make larger"],
    ["fragile", "delicate", "durable", "easily broken or damaged"],
    ["genuine", "authentic", "fake", "truly what it is said to be"],
    ["hostile", "unfriendly", "friendly", "showing opposition or dislike"],
    ["humble", "modest", "arrogant", "not having an exaggerated sense of importance"],
    ["inevitable", "unavoidable", "preventable", "certain to happen"],
    ["liberal", "generous", "stingy", "willing to give or share freely"],
    ["lucid", "clear", "confusing", "easy to understand"],
    ["meticulous", "careful", "careless", "showing great attention to detail"],
    ["novel", "new", "ordinary", "new and original"],
    ["obscure", "unclear", "obvious", "not clearly understood or known"],
    ["optimistic", "hopeful", "pessimistic", "expecting good things to happen"],
    ["permanent", "lasting", "temporary", "continuing without change"],
    ["plausible", "believable", "unlikely", "seeming reasonable or probable"],
    ["rapid", "swift", "slow", "happening in a short time"],
    ["reluctant", "unwilling", "eager", "not willing and therefore slow to act"],
    ["resilient", "strong", "fragile", "able to recover quickly from difficulty"],
    ["rigid", "stiff", "flexible", "unable to bend or change easily"],
    ["scarce", "rare", "abundant", "insufficient for demand"],
    ["sincere", "honest", "insincere", "free from pretence or deceit"],
    ["tranquil", "peaceful", "turbulent", "free from disturbance"],
    ["vague", "unclear", "definite", "not clearly expressed"],
    ["vital", "essential", "unimportant", "absolutely necessary"],
    ["weary", "tired", "energetic", "feeling very tired"],
    ["abandon", "forsake", "retain", "to leave completely"],
    ["benevolent", "kind", "cruel", "well-meaning and charitable"],
    ["coherent", "logical", "disordered", "clear and logically connected"],
    ["deficient", "insufficient", "adequate", "not having enough"],
    ["eloquent", "expressive", "inarticulate", "fluent and persuasive in speaking"],
    ["feasible", "practical", "impossible", "possible and practical to do"],
    ["gregarious", "sociable", "reserved", "fond of company"],
    ["impartial", "fair", "biased", "treating all sides equally"],
    ["lenient", "merciful", "strict", "more tolerant than expected"],
    ["obsolete", "outdated", "current", "no longer in use"],
    ["prudent", "wise", "careless", "acting with careful judgment"],
    ["robust", "strong", "weak", "strong and healthy"],
    ["subtle", "delicate", "obvious", "not immediately noticeable"],
    ["tedious", "boring", "exciting", "too long, slow, or dull"],
    ["unanimous", "agreed", "divided", "fully in agreement"],
    ["versatile", "adaptable", "limited", "able to perform many different functions"],
    ["vigilant", "watchful", "careless", "keeping careful watch for danger"],
    ["zealous", "enthusiastic", "indifferent", "showing great energy for a cause"],
    ["arduous", "difficult", "easy", "requiring great effort"],
    ["ambiguous", "unclear", "explicit", "open to more than one interpretation"],
    ["concise", "brief", "verbose", "giving much information in few words"],
    ["credible", "believable", "doubtful", "able to be believed"],
    ["dormant", "inactive", "active", "temporarily inactive"],
    ["erratic", "unpredictable", "steady", "not regular or consistent"],
    ["futile", "useless", "effective", "incapable of producing a useful result"],
    ["hinder", "obstruct", "assist", "to create difficulties for someone"],
    ["imminent", "near", "distant", "about to happen"],
    ["intricate", "complex", "simple", "very complicated or detailed"],
    ["meager", "scanty", "ample", "lacking in quantity or quality"],
    ["notorious", "infamous", "honorable", "famous for something bad"],
    ["profound", "deep", "superficial", "very great or intense"],
    ["revere", "respect", "despise", "to feel deep respect for"],
    ["sporadic", "occasional", "constant", "occurring at irregular intervals"],
    ["tenacious", "persistent", "yielding", "not giving up easily"],
    ["transparent", "clear", "opaque", "easy to perceive or detect"],
    ["trivial", "minor", "important", "of little value or importance"],
    ["validate", "confirm", "disprove", "to check or prove validity"],
    ["withdraw", "retreat", "advance", "to move back or remove"],
    ["amiable", "friendly", "hostile", "pleasant and easy to like"],
    ["brisk", "quick", "sluggish", "active and energetic"],
    ["conspicuous", "noticeable", "hidden", "clearly visible"],
    ["deplete", "exhaust", "replenish", "to reduce greatly in quantity"],
    ["ecstatic", "delighted", "miserable", "feeling overwhelming happiness"],
    ["frugal", "economical", "wasteful", "careful about spending money"],
    ["grievous", "serious", "minor", "very severe or serious"],
    ["impeccable", "flawless", "defective", "without any fault"],
    ["judicious", "sensible", "foolish", "showing good judgment"],
    ["lavish", "extravagant", "modest", "very generous or elaborate"],
    ["mundane", "ordinary", "extraordinary", "lacking interest or excitement"],
    ["pertinent", "relevant", "irrelevant", "directly related to the matter"],
    ["quaint", "charming", "modern", "attractively old-fashioned"],
    ["rational", "logical", "irrational", "based on reason"],
    ["stern", "strict", "gentle", "serious and unrelenting"],
    ["tacit", "unspoken", "explicit", "understood without being stated"],
    ["wary", "cautious", "careless", "feeling or showing caution"],
    ["yearn", "long", "reject", "to have an intense desire"]
  ];

  const spellingWords = [
    "accommodate","achievement","acquaintance","apparently","argument","beginning",
    "believe","calendar","category","cemetery","colleague","committee","conscience",
    "conscious","definitely","discipline","embarrass","environment","existence",
    "experience","foreign","government","grammar","guarantee","harass","height",
    "immediately","independent","knowledge","library","maintenance","millennium",
    "necessary","occasion","occurrence","parallel","privilege","pronunciation",
    "questionnaire","receive","recommend","restaurant","rhythm","separate",
    "successful","tomorrow","vacuum","weird","writing","business","convenient",
    "development","difference","excellent","February","forty","friend","happened",
    "intelligence","leisure","medicine","noticeable","opportunity","possession",
    "preferred","professional","referred","relevant","responsibility","schedule",
    "surprise","temperature","threshold","twelfth","until","vehicle","visible"
  ];

  const articleItems = [
    ["I saw ___ elephant near the river.", "an", ["a","the","no article"], "Use “an” before a vowel sound."],
    ["She wants to become ___ engineer.", "an", ["a","the","no article"], "“Engineer” begins with a vowel sound."],
    ["He is ___ honest man.", "an", ["a","the","no article"], "The “h” in “honest” is silent, so the word begins with a vowel sound."],
    ["They visited ___ university in Dhaka.", "a", ["an","the","no article"], "“University” begins with the consonant sound /y/."],
    ["Please close ___ door.", "the", ["a","an","no article"], "Use “the” for a specific door understood from context."],
    ["Mount Everest is ___ highest mountain in the world.", "the", ["a","an","no article"], "Superlative adjectives normally take “the”."],
    ["My brother plays ___ football every Friday.", "no article", ["a","an","the"], "No article is normally used before names of sports."],
    ["We had ___ wonderful time at the festival.", "a", ["an","the","no article"], "Use “a” before the consonant sound in “wonderful”."],
    ["She is reading ___ book I gave her.", "the", ["a","an","no article"], "The book is specific because it is identified by the clause."],
    ["He bought ___ umbrella because it was raining.", "an", ["a","the","no article"], "Use “an” before the vowel sound in “umbrella”."],
    ["Dhaka is ___ capital of Bangladesh.", "the", ["a","an","no article"], "Use “the” for a unique, specific title such as the capital."],
    ["She speaks ___ English fluently.", "no article", ["a","an","the"], "Languages normally take no article."],
    ["I need ___ hour to finish this work.", "an", ["a","the","no article"], "“Hour” begins with a vowel sound because the “h” is silent."],
    ["He adopted ___ European child.", "a", ["an","the","no article"], "“European” begins with the consonant sound /y/."],
    ["This is ___ most useful lesson in the book.", "the", ["a","an","no article"], "A superlative expression takes “the”."]
  ];

  const prepositionItems = [
    ["She is interested ___ classical music.", "in", ["on","at","for"], "The correct collocation is “interested in”."],
    ["He arrived ___ the airport at noon.", "at", ["in","on","to"], "Use “at” for a specific point or place."],
    ["The meeting starts ___ 9:00 a.m.", "at", ["on","in","by"], "Use “at” with exact clock times."],
    ["We have lived here ___ 2018.", "since", ["for","from","during"], "Use “since” with a starting point in time."],
    ["They walked ___ the bridge.", "across", ["between","among","beside"], "“Across” means from one side to the other."],
    ["She is good ___ mathematics.", "at", ["in","on","for"], "The correct collocation is “good at”."],
    ["The cat is hiding ___ the table.", "under", ["above","through","between"], "“Under” shows a lower position."],
    ["He apologized ___ being late.", "for", ["to","at","with"], "Use “apologize for” before a reason or action."],
    ["This book belongs ___ me.", "to", ["with","for","at"], "The correct expression is “belong to”."],
    ["The train passed ___ the tunnel.", "through", ["across","above","beside"], "“Through” indicates movement inside and out of an enclosed space."],
    ["She divided the cake ___ four children.", "among", ["between","with","into"], "Use “among” when referring to more than two people."],
    ["I prefer tea ___ coffee.", "to", ["than","over","from"], "The standard form is “prefer X to Y”."],
    ["He is responsible ___ the project.", "for", ["of","to","with"], "The correct collocation is “responsible for”."],
    ["We travelled ___ bus.", "by", ["with","on","at"], "Use “by” with a general means of transport."],
    ["The picture is hanging ___ the wall.", "on", ["at","in","over"], "Use “on” for contact with a surface."]
  ];

  const tenseItems = [
    ["By next year, she ___ her degree.", "will have completed", ["completes","completed","will complete"], "The future perfect describes an action completed before a future time."],
    ["When I reached the station, the train ___.", "had left", ["has left","left","leaves"], "The train left before another past action, so use past perfect."],
    ["He usually ___ to work by bus.", "goes", ["go","is going","went"], "Use simple present for habits; a third-person singular subject takes “-s”."],
    ["Listen! Someone ___ at the door.", "is knocking", ["knocks","knocked","has knocked"], "Use present continuous for an action happening now."],
    ["I ___ this book twice.", "have read", ["read","am reading","had read"], "Present perfect connects past experience with the present."],
    ["They ___ football when it started to rain.", "were playing", ["played","have played","are playing"], "Past continuous describes an action in progress when another past action occurred."],
    ["She ___ in Dhaka since 2020.", "has lived", ["lived","lives","is living"], "Use present perfect with “since” for a state continuing to the present."],
    ["The sun ___ in the east.", "rises", ["is rising","rose","has risen"], "Use simple present for universal truths."],
    ["At this time tomorrow, we ___ to Chattogram.", "will be travelling", ["travel","will travel","have travelled"], "Future continuous describes an action in progress at a future time."],
    ["He ___ his homework before he went outside.", "had finished", ["finished","has finished","finishes"], "Past perfect shows the earlier of two past actions."],
    ["I ___ her yesterday.", "met", ["have met","meet","had met"], "A finished past time marker such as “yesterday” takes simple past."],
    ["She ___ dinner right now.", "is cooking", ["cooks","cooked","has cooked"], "“Right now” indicates present continuous."],
    ["We ___ the result tomorrow.", "will know", ["knew","know","have known"], "Use simple future for a future fact or prediction."],
    ["He ___ here for five years before moving abroad.", "had worked", ["worked","has worked","is working"], "Past perfect can describe duration before another past event."],
    ["If it rains, we ___ at home.", "will stay", ["stayed","stay","would stay"], "The first conditional uses present simple in the if-clause and “will” in the result clause."]
  ];

  const agreementItems = [
    ["Neither the teacher nor the students ___ ready.", "are", ["is","was","has"], "With “neither...nor,” the verb usually agrees with the nearer subject “students”."],
    ["Each of the players ___ a locker.", "has", ["have","are having","were"], "“Each” is singular and takes a singular verb."],
    ["The news ___ surprising.", "is", ["are","were","have"], "“News” is grammatically singular."],
    ["Mathematics ___ my favorite subject.", "is", ["are","were","have been"], "Names of academic subjects ending in “-s” are usually singular."],
    ["A number of students ___ absent today.", "are", ["is","was","has"], "“A number of” takes a plural verb."],
    ["The number of applicants ___ increasing.", "is", ["are","have","were"], "“The number of” takes a singular verb."],
    ["Either Rahim or Karim ___ the key.", "has", ["have","are having","were"], "With two singular subjects joined by “or,” use a singular verb."],
    ["Bread and butter ___ his usual breakfast.", "is", ["are","were","have"], "When two items are treated as one combined dish, use a singular verb."],
    ["The committee ___ reached its decision.", "has", ["have","are","were"], "As a single unit, the collective noun takes a singular verb."],
    ["There ___ several reasons for the delay.", "are", ["is","was","has"], "The verb agrees with the plural noun “reasons”."],
    ["One of my friends ___ in Canada.", "lives", ["live","are living","have lived"], "The head subject is singular: “one”."],
    ["Everyone ___ invited to the ceremony.", "is", ["are","were","have"], "Indefinite pronouns such as “everyone” are singular."],
    ["The scissors ___ on the table.", "are", ["is","was","has"], "“Scissors” is treated as a plural noun."],
    ["Ten kilometers ___ a long distance to walk.", "is", ["are","were","have"], "A measurement treated as one amount takes a singular verb."],
    ["My family ___ planning a trip together.", "is", ["are","were","have"], "When the family acts as one unit, use a singular verb."]
  ];

  const sentenceItems = [
    ["Choose the correct sentence.", "She does not like coffee.", ["She do not like coffee.","She does not likes coffee.","She not likes coffee."], "After “does not,” use the base form of the verb."],
    ["Choose the correct sentence.", "He has been working here for five years.", ["He is working here since five years.","He has working here for five years.","He have been working here for five years."], "Use present perfect continuous with “for” to show duration continuing to the present."],
    ["Choose the correct sentence.", "If I were you, I would apologize.", ["If I was you, I will apologize.","If I am you, I would apologize.","If I were you, I will apologize."], "The unreal conditional uses “were” and “would”."],
    ["Choose the correct sentence.", "The furniture is expensive.", ["The furnitures are expensive.","The furniture are expensive.","The furnitures is expensive."], "“Furniture” is an uncountable singular noun."],
    ["Choose the correct sentence.", "She is senior to me.", ["She is senior than me.","She is senior from me.","She is more senior than me."], "The adjective “senior” is followed by “to,” not “than”."],
    ["Choose the correct sentence.", "He prevented me from entering.", ["He prevented me to enter.","He prevented me for entering.","He prevented me enter."], "The correct structure is “prevent someone from doing something.”"],
    ["Choose the correct sentence.", "I look forward to meeting you.", ["I look forward to meet you.","I am look forward to meeting you.","I look forward for meeting you."], "Here “to” is a preposition, so it is followed by a gerund."],
    ["Choose the correct sentence.", "One of the boys has won the prize.", ["One of the boys have won the prize.","One of the boy has won the prize.","One of the boys are winning the prize."], "The subject is “one,” so the verb is singular."],
    ["Choose the correct sentence.", "He is accustomed to waking up early.", ["He is accustomed to wake up early.","He accustomed to waking up early.","He is accustomed for waking up early."], "“Be accustomed to” is followed by a noun or gerund."],
    ["Choose the correct sentence.", "The teacher asked where I lived.", ["The teacher asked where did I live.","The teacher asked where do I live.","The teacher asked where I did live."], "Indirect questions use statement word order."],
    ["Choose the correct sentence.", "No sooner had he arrived than it started raining.", ["No sooner he arrived when it started raining.","No sooner had he arrived when it started raining.","No sooner did he arrive than it had started raining."], "The standard structure is “No sooner...than” with inversion."],
    ["Choose the correct sentence.", "She has fewer books than I do.", ["She has less books than I do.","She have fewer books than I do.","She has few books then I do."], "Use “fewer” with countable plural nouns."],
    ["Choose the correct sentence.", "Despite the rain, they continued playing.", ["Despite of the rain, they continued playing.","Although the rain, they continued playing.","In spite the rain, they continued playing."], "Use “despite” directly before a noun phrase."],
    ["Choose the correct sentence.", "He insisted on paying the bill.", ["He insisted to pay the bill.","He insisted for paying the bill.","He insisted that paying the bill."], "The correct collocation is “insist on” followed by a gerund."],
    ["Choose the correct sentence.", "Hardly had I sat down when the phone rang.", ["Hardly I had sat down than the phone rang.","Hardly had I sat down than the phone rang.","Hardly did I sit down when the phone had rung."], "The standard pattern is “Hardly...when” with inversion."]
  ];

  const names = ["Amina","Rahim","Nadia","Karim","Samira","Hasan","Maya","Rafi","Tania","Farhan"];
  const places = ["library","market","station","office","school","museum","park","hospital"];
  const times = ["every morning","on Fridays","after lunch","before sunset","at weekends","during the holidays"];

  const typeDefinitions = [
    { type: "synonyms", category: "synonyms" },
    { type: "antonyms", category: "antonyms" },
    { type: "definition", category: "vocabulary" },
    { type: "spelling", category: "spelling" },
    { type: "articles", category: "grammar" },
    { type: "prepositions", category: "prepositions" },
    { type: "tenses", category: "tenses" },
    { type: "agreement", category: "grammar" },
    { type: "sentence", category: "grammar" }
  ];

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(array, random) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function typoVariants(word) {
    const variants = new Set();
    if (word.length > 5) {
      const mid = Math.floor(word.length / 2);
      variants.add(word.slice(0, mid) + word[mid + 1] + word[mid] + word.slice(mid + 2));
      variants.add(word.slice(0, mid) + word[mid] + word.slice(mid));
      variants.add(word.slice(0, mid - 1) + word.slice(mid));
    }
    variants.add(word.replace(/([a-z])\1/i, "$1"));
    variants.add(word.replace(/ie/i, "ei"));
    variants.add(word.replace(/ei/i, "ie"));
    variants.add(word + word.slice(-1));
    variants.delete(word);
    return [...variants].filter(v => v && v !== word).slice(0, 8);
  }

  function getDifficulty(id) {
    const mod = Math.floor((id - 1) / typeDefinitions.length) % 9;
    if (mod < 3) return "easy";
    if (mod < 6) return "medium";
    return "hard";
  }

  function getTypeForId(id) {
    return typeDefinitions[id % typeDefinitions.length];
  }

  function distractorWords(correct, random, fieldIndex = 1) {
    const pool = vocabulary.map(item => item[fieldIndex]).filter(word => word !== correct);
    return shuffle(pool, random).slice(0, 3);
  }

  function generateQuestion(id) {
    if (!Number.isInteger(id) || id < 1 || id > TOTAL_QUESTIONS) {
      throw new Error(`Question id must be between 1 and ${TOTAL_QUESTIONS}.`);
    }

    const random = mulberry32(id * 2654435761);
    const def = getTypeForId(id);
    const difficulty = getDifficulty(id);
    const variant = Math.floor(id / typeDefinitions.length);
    let question = "";
    let correct = "";
    let wrong = [];
    let explanation = "";
    let context = "";

    if (def.type === "synonyms") {
      const item = vocabulary[Math.floor(random() * vocabulary.length)];
      question = variant % 3 === 0
        ? `Choose the word closest in meaning to “${item[0]}”.`
        : variant % 3 === 1
          ? `Which option is a synonym of “${item[0]}”?`
          : `Select the best synonym for the word “${item[0]}”.`;
      correct = item[1];
      wrong = distractorWords(correct, random, 1);
      explanation = `“${item[1]}” is closest in meaning to “${item[0]}”.`;
    }

    if (def.type === "antonyms") {
      const item = vocabulary[Math.floor(random() * vocabulary.length)];
      question = variant % 3 === 0
        ? `Choose the word opposite in meaning to “${item[0]}”.`
        : variant % 3 === 1
          ? `Which option is an antonym of “${item[0]}”?`
          : `Select the best opposite of the word “${item[0]}”.`;
      correct = item[2];
      wrong = distractorWords(correct, random, 2);
      explanation = `“${item[2]}” expresses the opposite meaning of “${item[0]}”.`;
    }

    if (def.type === "definition") {
      const item = vocabulary[Math.floor(random() * vocabulary.length)];
      question = variant % 2 === 0
        ? `Which word means “${item[3]}”?`
        : `Choose the word that best matches this meaning: “${item[3]}”.`;
      correct = item[0];
      wrong = distractorWords(correct, random, 0);
      explanation = `“${item[0]}” means ${item[3]}.`;
    }

    if (def.type === "spelling") {
      const word = spellingWords[Math.floor(random() * spellingWords.length)];
      const variants = typoVariants(word);
      while (variants.length < 3) {
        const pos = 1 + Math.floor(random() * Math.max(1, word.length - 2));
        const changed = word.slice(0, pos) + word[pos] + word.slice(pos);
        if (changed !== word && !variants.includes(changed)) variants.push(changed);
      }
      question = variant % 2 === 0
        ? "Choose the correctly spelled word."
        : "Which spelling is correct?";
      correct = word;
      wrong = variants.slice(0, 3);
      explanation = `The correct spelling is “${word}”.`;
    }

    if (def.type === "articles") {
      const item = articleItems[Math.floor(random() * articleItems.length)];
      question = item[0];
      correct = item[1];
      wrong = item[2];
      explanation = item[3];
    }

    if (def.type === "prepositions") {
      const item = prepositionItems[Math.floor(random() * prepositionItems.length)];
      question = item[0];
      correct = item[1];
      wrong = item[2];
      explanation = item[3];
    }

    if (def.type === "tenses") {
      const item = tenseItems[Math.floor(random() * tenseItems.length)];
      question = item[0];
      correct = item[1];
      wrong = item[2];
      explanation = item[3];
    }

    if (def.type === "agreement") {
      const item = agreementItems[Math.floor(random() * agreementItems.length)];
      question = item[0];
      correct = item[1];
      wrong = item[2];
      explanation = item[3];
    }

    if (def.type === "sentence") {
      const item = sentenceItems[Math.floor(random() * sentenceItems.length)];
      question = item[0];
      correct = item[1];
      wrong = item[2];
      explanation = item[3];
      if (variant % 4 === 3) {
        const name = names[Math.floor(random() * names.length)];
        const place = places[Math.floor(random() * places.length)];
        const time = times[Math.floor(random() * times.length)];
        context = `${name} is preparing for an English test at the ${place} ${time}.`;
      }
    }

    const options = shuffle([correct, ...wrong.slice(0, 3)], random);
    return {
      id,
      bankLabel: `EA-${String(id).padStart(6, "0")}`,
      category: def.category,
      type: def.type,
      difficulty,
      question,
      context,
      options,
      correctIndex: options.indexOf(correct),
      correctAnswer: correct,
      explanation
    };
  }

  function randomQuestionIds({ category = "mixed", difficulty = "easy", count = 10, seed = Date.now() }) {
    const random = mulberry32((seed >>> 0) || 1);
    const ids = [];
    const used = new Set();
    let attempts = 0;
    const maxAttempts = TOTAL_QUESTIONS * 2;

    while (ids.length < count && attempts < maxAttempts) {
      attempts++;
      const id = 1 + Math.floor(random() * TOTAL_QUESTIONS);
      if (used.has(id)) continue;
      const q = generateQuestion(id);
      const categoryMatch =
        category === "mixed" ||
        q.category === category ||
        (category === "vocabulary" && ["vocabulary", "synonyms", "antonyms"].includes(q.category));

      if (categoryMatch && q.difficulty === difficulty) {
        used.add(id);
        ids.push(id);
      }
    }

    if (ids.length < count) {
      throw new Error("Unable to generate the requested quiz. Try another category.");
    }

    return ids;
  }

  window.EnglishQuestionBank = Object.freeze({
    total: TOTAL_QUESTIONS,
    generateQuestion,
    randomQuestionIds
  });
})();

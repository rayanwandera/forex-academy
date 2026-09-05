export const courses = [  {
    id: 'avoid-scams',
    title: 'How to Avoid Being Scammed',
    tagline: 'Recognize the patterns scammers use so you can protect your money.',
    lessons: [
      {
        id: 'broker-red-flags',
        title: 'Signs of a Fake or Unregulated Broker',
        body: `Before depositing money with any broker, check whether it is licensed by a real financial regulator (for example, in Uganda that's the Capital Markets Authority for licensed forex dealers; internationally, regulators include the FCA, ASIC, or CySEC). A license number you can verify directly on the regulator's own website is a good sign — a license number you can only see quoted on the broker's own site is not proof.

Warning signs of a fake or unregulated broker:
- No verifiable license, or a license number that doesn't match the regulator's public register.
- Pressure to deposit quickly, "bonus" offers that vanish if you try to withdraw, or minimum withdrawal amounts that keep changing.
- A platform that isn't a recognized, widely-used trading terminal, with prices that don't match other brokers.
- Withdrawal requests that get delayed, "reviewed," or blocked with shifting excuses.

If you can't easily find and verify a regulator, treat that as a decisive red flag, not a minor inconvenience.`,
      },
      {
        id: 'guaranteed-profit-red-flags',
        title: '"Guaranteed Profit" and Ponzi Red Flags',
        body: `No legitimate trader or platform can guarantee profits — the market moves on real, unpredictable information, and even the best professional traders have losing periods. Any pitch that removes this uncertainty is misrepresenting how trading works.

Common patterns to recognize:
- "Invest with us and we'll trade for you, guaranteed X% per week." Fixed, high, regular returns are the hallmark of a Ponzi scheme, where early investors are paid using new investors' deposits rather than real trading profit.
- Heavy emphasis on recruiting other people to invest, with your own returns tied to how many people you bring in. If the money mainly flows from new recruits rather than genuine trading activity, that is a pyramid structure, not a trading business.
- Screenshots of huge profits with no way to verify the underlying account, and reluctance to explain the actual strategy in plain terms.
- Urgency and secrecy: "this offer closes tonight," "don't tell your bank/family," or discouraging you from researching the company independently.

If you're ever unsure whether an opportunity is genuine, slow down and verify independently — a real opportunity will still be there tomorrow; a scam is often designed to disappear once you start asking questions.`,
      },
      {
        id: 'protecting-accounts',
        title: 'Protecting Your Trading and Mobile Money Accounts',
        body: `Your mobile money PIN and your trading account password are the two things that protect your money — treat both the same way you'd treat cash in your hand.

- Never share your mobile money PIN with anyone, for any reason, including someone claiming to be from your telecom, your bank, or a "trading support agent." Legitimate mobile money payments prompt you to enter your PIN directly on your own phone, not through a website form or over a phone call.
- Never share your trading account password, and enable two-factor authentication if your broker offers it.
- Be suspicious of anyone who asks you to install "remote access" software so they can "help" you trade or withdraw — this is a common way scammers take control of a device.
- Use a unique password for your trading and payment accounts, not one you reuse elsewhere.

A simple test: if completing an action requires you to hand over a PIN or password to another person, stop — that step should never be necessary.`,
      },
      {
        id: 'vetting-gurus',
        title: 'Vetting Signal Sellers and "Gurus"',
        body: `Social media is full of accounts selling trading "signals," mentorship, or copy-trading services, often alongside a lifestyle of cars and cash meant to build trust quickly.

Before paying anyone for signals or mentorship:
- Ask for a verifiable, independently-audited track record, not a personal screenshot. Genuine track records can usually be verified through the broker or a third-party verification service.
- Be wary of any "guru" whose main visible income appears to come from selling courses and signals rather than from trading itself.
- Treat "VIP group," "limited spots," and countdown timers as sales tactics, not evidence of quality.
- Remember that even a real, skilled trader's signals will lose sometimes — anyone promising an unbroken winning streak is not being honest with you.

It's fine to learn from others, but pay for education, not for someone else's unverifiable promises about your future profits.`,
      },
      {
        id: 'if-scammed',
        title: "What To Do If You've Been Scammed",
        body: `If you believe you've sent money to a scam:
1. Stop all further payments immediately, even if you're told "one more fee" will unlock a withdrawal — that request is itself part of the scam.
2. Contact your mobile money provider or bank right away to report the transaction and ask about reversal options; the sooner you report it, the better the odds.
3. Report the platform to your country's financial regulator and, where relevant, to the police cybercrime unit — this can help protect others even if your funds aren't recovered.
4. Change your passwords and PINs, especially if you shared any credentials or installed software at the scammer's request.
5. Document everything (messages, transaction IDs, screenshots) before accounts or chats disappear.

There's no shame in being targeted — these schemes are specifically engineered to look legitimate. Acting quickly and reporting it matters more than anything else at that point.`,
      },
    ],
  },
  {
    id: 'ai-in-trading',
    title: 'Using AI in Trading',
    tagline: 'Use AI tools as an assistant, not an oracle.',
    lessons: [
      {
        id: 'what-ai-can-do',
        title: 'What AI Can and Can\u2019t Do in Trading',
        body: `AI tools, including language models and machine learning models, are good at summarizing large amounts of text, spotting statistical patterns in historical data, and speeding up repetitive analysis. They are not able to reliably predict future price moves, because markets are influenced by unpredictable real-world events (news, politics, sudden liquidity shocks) that no model has full information about in advance.

Useful ways to use AI:
- Summarizing news and economic reports quickly so you can form your own view faster.
- Explaining a concept, indicator, or strategy in plain language.
- Organizing and reviewing your own trading journal to spot recurring mistakes.

Ways AI is commonly misused in trading marketing:
- "AI trading bot guarantees X% monthly" — the same guaranteed-return red flag from the scams lesson, just with "AI" attached to sound more credible.
- Treating a model's confident-sounding output as certainty, when it's actually a probability-based guess that can be wrong.`,
      },
      {
        id: 'ai-news-sentiment',
        title: 'Using AI for News and Sentiment Analysis',
        body: `AI tools can help you process more news and market commentary than you could read manually, and can help gauge whether overall sentiment around a currency or economy is turning more positive or negative.

Practical use: ask an AI assistant to summarize the key economic releases for the week (interest rate decisions, inflation data, employment figures) and explain why each one typically moves the relevant currency. This builds your own understanding faster than reading raw reports alone.

Caution: sentiment can shift quickly, and an AI summary reflects the data it was given up to that point — it can miss breaking news entirely. Always check the timestamp and source of any information before trading on it, and use AI summaries as a starting point for your own research, not a final signal to act on.`,
      },
      {
        id: 'ai-backtesting',
        title: 'Backtesting Ideas with AI Tools',
        body: `Backtesting means checking how a trading idea would have performed on historical price data. AI-assisted tools can speed up writing the code or logic for a backtest, and can help you review the results.

A backtest that looks profitable can still fail in live trading because of overfitting (a rule tuned so precisely to past data that it doesn't generalize), ignoring trading costs and slippage, or using data in a way that "peeks" at future information by accident.

If you use AI to help build or review a backtest: ask it to explain its assumptions, test the idea on a different time period than the one it was built on, and treat a good backtest as one piece of evidence, not proof that a strategy will keep working.`,
      },
      {
        id: 'ai-bots-skepticism',
        title: 'Staying Skeptical of AI "Trading Bots"',
        body: `Many products marketed as "AI trading bots" that trade fully automatically for you and promise fixed returns are dressed-up versions of the same guaranteed-profit scams covered earlier — the "AI" label is used to make an old scam sound new and technical.

Before trusting any automated system with real money:
- Ask exactly what it does and whether you can see its actual trade history on a verifiable, independent record — not marketing screenshots.
- Start with an amount you could fully afford to lose, and monitor it closely rather than "setting and forgetting."
- Remember that no automated system, AI-branded or not, removes market risk. If a product's entire pitch is "no effort, guaranteed income," that pitch is the product being sold — not real trading performance.`,
      },
    ],
  },
];

courses.push({
  id: 'ai-business-launch',
  title: 'AI Business Launch Kit',
  tagline: 'A practical 30-day system for using AI to find an opportunity, build an offer, and get your first customers.',
  lessons: [
    {
      id: 'start-here',
      title: 'Start Here & The 3 Adviser Lenses',
      body: `Don't work through this passively. Every module ends with an action — the goal is to finish with something real, not just more information.

By the end you will have built: a business opportunity, a target customer and validated problem, an offer and pricing, brand and marketing assets, a WhatsApp sales system, a 30-day launch plan, a 90-day strategy, and a 3-year vision.

The operating loop for the whole course: LEARN → BUILD → TEST → MEASURE → IMPROVE. AI accelerates the work; customers decide whether the solution is actually useful.

Run decisions through three lenses, then let evidence make the final call:
- Leverage lens: "What can I build once that keeps creating value?" (leverage, specific knowledge, ownership, compounding, freedom)
- Customer lens: "What does the customer actually need?" (customer obsession, working backwards, cheap experiments, systems)
- Courage lens: "Am I willing to be seen trying?" (courage, values, resilience, vulnerability)`,
    },
    {
      id: 'discover',
      title: 'Discover: Finding a Real Problem',
      body: `Find opportunities by starting with problems, not random product ideas.

Idea vs. problem: "I want to sell clothes" is an idea. "Young professionals struggle to find affordable workwear that can be delivered quickly" is a problem. Always start with the problem.

Problem Hunt: observe businesses, schools, offices, markets, restaurants, shops, online communities, and your own daily life. Write down 20 problems you notice.

Opportunity Scorecard — score each idea 1-5 on: how common the problem is, how painful it is, whether people already spend money on it, whether you can reach the customers, whether you can actually solve it, and whether it's cheap to test.

AI Opportunity Generator prompt — adapt and use this with any AI assistant:
"Act as a practical business opportunity analyst. My location is [LOCATION]. My skills are [SKILLS]. My available capital is [CAPITAL]. I have access to [PHONE/LAPTOP/INTERNET]. People I can reach include [NETWORK]. Problems I have noticed: [PROBLEMS]. Generate 15 realistic business or service opportunities. For each provide: 1. Problem 2. Target customer 3. Solution 4. Why the customer might pay 5. Skills required 6. Startup requirements 7. 7-day test 8. First 10 prospects 9. Competitor/alternative categories 10. Risks. Do not promise income. Do not assume demand without evidence."

Validation — interview 5-10 potential customers and ask: How are you currently solving this? What is frustrating? How often does it happen? Have you paid for a solution? What would a better solution look like? Look for actual behavior, not just hypothetical "yes" answers.`,
    },
    {
      id: 'build-position',
      title: 'Build & Position: Turning a Problem into an Offer',
      body: `Build — turn the problem into a focused offer.
- Choose one customer: don't say "everyone." Start with a group you can actually reach.
- Understand them: their goals, frustrations, alternatives, and buying behavior.
- Define the result: customers care about outcomes, not your list of tools or methods.

Value proposition template: "I help [CUSTOMER] achieve [RESULT] through [SOLUTION]." Example: "I help small restaurants create professional WhatsApp and social-media marketing content through affordable monthly content packages."

Productize your skill — move up a ladder: freelancer ("I design flyers") → productized service ("Restaurant Marketing Starter Pack") → digital product ("Restaurant Marketing Template Kit"). Create three packages: Basic (smallest useful solution), Standard (best-value solution), Premium (comprehensive solution).

Position — make it clear who you help, what you solve, and why it matters.
Brand equation: WHO + PROBLEM + PROMISE + DIFFERENCE.
Positioning statement: "For [CUSTOMER] who struggle with [PROBLEM], [BUSINESS] provides [SOLUTION] so they can [RESULT]."

Brand kit to fill in: business name, tagline, business description, and brand voice (Professional / Friendly / Bold / Simple / Educational / Premium / Youthful / Trustworthy).`,
    },
    {
      id: 'ai-power',
      title: 'AI Power: Prompts That Actually Work',
      body: `Use AI for research, writing, planning, marketing, customer service, and productivity — but AI drafts, you decide. Verify important information before using it with real customers.

The 7-part prompt formula: 1. Role (who should AI act as?) 2. Context (what does it need to know?) 3. Objective (what are we trying to achieve?) 4. Input (what information do we provide?) 5. Constraints (what should it avoid?) 6-7. Output + Quality (what format, and what checks?).

Master Business Prompt — adapt and use:
"Act as my business strategy assistant. Business: [BUSINESS]. Target customer: [CUSTOMER]. Problem: [PROBLEM]. Current offer: [OFFER]. Location: [LOCATION]. Main objective: [OBJECTIVE]. Analyze my business and give me: 1. Biggest customer problem 2. Strongest value proposition 3. Weakness in my current offer 4. Three ways to differentiate 5. Five marketing angles 6. Ten content ideas 7. Five sales messages 8. Three upsells 9. Customer objections and responses 10. One action I should take today. Be practical and realistic. Do not invent customer research. Clearly distinguish assumptions from known information."

Research Prompt: "Act as a market research assistant. Business: [BUSINESS]. Customer: [CUSTOMER]. Location: [LOCATION]. Problem: [PROBLEM]. Identify customer needs, objections, existing alternatives, interview questions and differentiation ideas. Separate assumptions from facts and list what needs verification."

Offer Creator Prompt: "Act as a product strategist. Customer: [CUSTOMER]. Problem: [PROBLEM]. Skills/resources: [SKILLS]. Create BASIC, STANDARD and PREMIUM offers with deliverables, outcome, pricing logic, differentiation, objections and upsells. Do not guarantee results."

Content Generator Prompt: "Act as a social media strategist. Business: [BUSINESS]. Customer: [CUSTOMER]. Offer: [OFFER]. Create 30 content ideas: 6 educational, 6 problem-awareness, 6 trust-building, 6 engagement, 6 promotional. For each give a hook, main idea, CTA and suggested format."`,
    },
    {
      id: 'create-whatsapp',
      title: 'Create & WhatsApp: Assets and Sales Setup',
      body: `Create assets customers can see, understand, and act on:
- Business flyer: name, problem, offer, benefit, price, call-to-action, contact.
- Price list: simple, readable, organized, accurate.
- Social post: hook → value → call-to-action.
- Catalogue: photo, name, description, price, ordering instructions.
- Proof: use genuine customer feedback and real work where you have it.
- Business profile: clear description, contact, offer, service area where relevant.

WhatsApp Business setup — professionalize it: business name, description, hours, location where appropriate, catalogue, and quick replies.

Sales conversation flow: DISCOVER → UNDERSTAND → RECOMMEND → OFFER → CLOSE. Understand the customer's need before throwing out a price.

Follow-up schedule: Day 1 — initial conversation. Day 2 — helpful follow-up. Day 4 — address a possible objection. Day 7 — final polite follow-up. Never spam. Respect people's decisions.`,
    },
    {
      id: 'marketing',
      title: 'Marketing: Building Attention Before Asking to Buy',
      body: `Build attention and trust before asking people to buy. Rotate through five content types: Educate (teach something useful), Entertain (capture attention), Prove (show evidence and process), Connect (show personality or story), Sell (make a clear offer). Rule: don't make every post "buy now."

30-day content calendar:
- Week 1 (Awareness): business intro, problem, tip, offer, behind-the-scenes, FAQ, call-to-action.
- Week 2 (Trust): a mistake you learned from, a demo, education, a story, a testimonial, FAQ, offer.
- Week 3 (Conversion): problem, solution, demo, handling an objection, offer, FAQ, call-to-action.
- Week 4 (Growth): story, education, referral ask, demo, FAQ, offer, behind-the-scenes, testimonial, recap.`,
    },
    {
      id: 'customers-sales',
      title: 'First Customers & Sales',
      body: `Use the 50 → 20 → 10 system to get your first customers:
- 50: build a prospect list of 50 people or businesses matching your customer profile.
- 20: prioritize down to the 20 prospects where your solution is most relevant.
- 10: reach out to 10 with personalized messages and a useful sample.

Outreach script — personalize it, don't spam: "Hello [NAME]. I came across your business and noticed [SPECIFIC OBSERVATION]. I help [TYPE OF CUSTOMER] with [SPECIFIC PROBLEM]. I put together a quick idea/sample that could be useful. Would you like me to share it?"

Selling is helping someone understand whether your solution is right for their problem: PROSPECT → CONVERSATION → DISCOVERY → OFFER → QUESTIONS → DECISION → PAYMENT → DELIVERY → FOLLOW-UP.

Common objections and how to handle them:
- "It's expensive." Ask which part feels outside their budget — understand before discounting.
- "I'll think about it." Ask if there's anything you can clarify for them.
- "I already have someone." Ask what they'd ideally improve about their current service.`,
    },
    {
      id: 'delivery-money',
      title: 'Delivery & Money',
      body: `Your reputation becomes an asset when you consistently create a good customer experience.
- Before: agree on scope, price, deadline, deliverables, revisions, and payment terms.
- During: communicate. Don't disappear. Flag problems early.
- After: ask for feedback and a genuine testimonial where appropriate.

Understand the difference between cost (what it costs you to operate), price (what the customer pays), and profit (what remains after costs).

Weekly scorecard to track: prospects contacted, conversations, offers made, sales, revenue, costs, profit, repeat customers.`,
    },
    {
      id: 'scale-products',
      title: 'Scale & Digital Products',
      body: `When something works, document it and reduce how dependent it is on your personal hours: YOU DO EVERYTHING → TEMPLATES → SOPs → AUTOMATION → DELEGATION → PRODUCTS → DISTRIBUTION.

Four forms of leverage: code/software, media/content, capital, and people/teams. As a beginner, the most accessible forms are building valuable knowledge, media, repeatable systems, and digital assets.

Digital products package your knowledge into reusable assets: templates, prompt packs (structured AI workflows), workbooks (guided implementation), mini-courses (focused transformation), guides (practical reference material), and checklists (repeatable execution).

The formula: PROBLEM → KNOWLEDGE → FRAMEWORK → TEMPLATE → PRODUCT → DISTRIBUTION → FEEDBACK → IMPROVEMENT.`,
    },
    {
      id: 'challenge-launch',
      title: 'The 20K Challenge & 30-Day Launch',
      body: `The 20K Challenge is a practical experiment in creating and selling value — the amount is not guaranteed, it's a target to aim a real test at. Pick one option: Option A, sell a service. Option B, sell a digital product. Option C, solve a specific business problem for someone.

7-Day Challenge: Day 1 choose a problem. Day 2 choose a customer. Day 3 create an offer. Day 4 create a sample. Day 5 contact prospects. Day 6 follow up. Day 7 review results.

The 30-Day Launch combines the entire course into one execution sprint:
- Week 1 — Discover: find problems, research customers, validate, choose an opportunity.
- Week 2 — Build: offer, brand, pricing, assets, WhatsApp setup.
- Week 3 — Market: content, prospect list, outreach, conversations.
- Week 4 — Sell + Improve: offers, delivery, feedback, refinement.`,
    },
    {
      id: 'strategy-decisions',
      title: '3-Year Strategy & Decision Framework',
      body: `Your business should support the life you're trying to create.

Rough timeline: 0-30 days (explore — find a promising opportunity; main risk is overthinking; leverage is customer conversations). 2-3 months (first revenue — first paying customers; main risk is fear of rejection; leverage is consistent outreach). 4-6 months (validate — track leads, sales, revenue, costs, satisfaction, repeat purchases; main risk is chasing too many directions; leverage is focus). 7-12 months (systemize — build SOPs, templates, packages; main risk is owner dependency; leverage is systems). Year 2 (scale — choose based on evidence: service, digital products, team, technology, or a combination). Year 3+ (ownership & leverage — ask "what asset am I building?": audience, brand, customers, course, templates, software, IP, team, or distribution).

Decision framework — run major decisions through three lenses, then check the evidence: Leverage (does this build a skill, relationship, system, or asset that becomes more valuable?), Customer (does this make the customer's experience meaningfully better?), Courage (am I avoiding this because it's genuinely bad, or because I'm afraid?).

Personal strategy — define the life outcomes your business is meant to support: a 12-month and 3-year financial target, a valuable skill you want to master, the asset your business will build, and what "freedom" actually means to you personally.

Failure & resilience — the goal isn't never failing, it's learning faster from reality. After a setback, ask: What did I expect? What actually happened? What assumption was wrong? What did the customer teach me? What will I change? What will I test next?`,
    },
    {
      id: 'final-project',
      title: 'Final Project: Your Business Launch Portfolio',
      body: `Doing the work is the graduation requirement. Your final portfolio should include: a personal inventory, 20 problems, an opportunity scorecard, customer interviews, your chosen opportunity, a customer profile, a problem statement, your solution, a value proposition, three offers with pricing, a business name and tagline, a brand identity, a flyer, a price list, a catalogue, 10 marketing posts, a 30-day content calendar, your WhatsApp setup, a prospect list, an outreach script, a follow-up system, evidence of 10 prospects contacted, customer feedback, a revised offer, a 90-day plan, a 1-year goal, a 3-year vision, your main bottleneck, and your main leverage point.

Final questions to answer for yourself: What problem does your business solve? Who specifically has this problem? What alternatives do they currently use? Why would someone choose you? What is your smallest possible test? How will you find your first 10 prospects? What is your offer? What is your biggest current bottleneck? What evidence would cause you to change direction? What asset are you building over the next three years?

Closing thought: don't finish this course with more information — finish it with more capability. AI can accelerate execution, but customers, evidence, and consistent action are what determine whether a business actually works.`,
    },
  ],
});

export const COURSE_PRICE_UGX = 20000;
export const REFERRAL_BONUS_UGX = 5000;

// Shown to users during manual payment. Update this to your real Airtel Money number.
export const MERCHANT_PHONE_DISPLAY = '0703 923 900';

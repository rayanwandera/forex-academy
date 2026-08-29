export const courses = [
  {
    id: 'basics',
    title: 'Forex Trading Basics',
    tagline: 'Start from zero and understand how the currency market actually works.',
    lessons: [
      {
        id: 'what-is-forex',
        title: 'What Is Forex Trading',
        body: `Forex (foreign exchange) is the market where one currency is exchanged for another, for example swapping UGX for USD. It is the largest financial market in the world, trading around the clock on weekdays because it spans banks, brokers, and traders across every time zone.

You never buy a currency alone — you always buy one currency and sell another at the same time, which is why prices are shown as pairs, like EUR/USD or USD/UGX. If you believe the first currency in the pair will strengthen against the second, you buy the pair. If you believe it will weaken, you sell it.

Retail traders access this market through a broker's trading platform, not by physically exchanging cash. It's important to separate "forex" the global market (real, huge, and used every day by banks and businesses) from "get-rich-quick forex trading" (a marketing pitch that preys on beginners) — the market itself is neutral; how it's sold to you is where you need to stay alert.`,
      },
      {
        id: 'pairs-pips-lots',
        title: 'Currency Pairs, Pips and Lots',
        body: `A currency pair has a base currency and a quote currency, written as BASE/QUOTE. EUR/USD at 1.0850 means 1 euro buys 1.0850 US dollars.

A pip is the smallest standard price move for most pairs, usually the fourth decimal place (0.0001). If EUR/USD moves from 1.0850 to 1.0860, that's a 10 pip move. Pip value in your account currency depends on your position size.

Position size is measured in lots: a standard lot is 100,000 units of the base currency, a mini lot is 10,000, and a micro lot is 1,000. Beginners should start with micro lots so that a normal price swing doesn't wipe out a large share of the account. Position size, not "confidence" in a trade idea, is what determines how much you can lose.`,
      },
      {
        id: 'leverage-margin',
        title: 'Leverage and Margin',
        body: `Leverage lets you control a larger position than the cash you put up. For example, 1:100 leverage means $1,000 of your own money can control a $100,000 position.

Leverage multiplies both gains and losses. It does not create an edge — it only changes the size of the outcome, in either direction. Margin is the portion of your own funds a broker sets aside to open and hold a leveraged position; if the market moves against you enough, you can receive a margin call or be automatically stopped out ("liquidated"), losing the margin you put up.

A practical rule for beginners: use the lowest leverage your broker allows while you are learning, and treat high leverage as a tool for experienced risk managers, not a shortcut to bigger profits.`,
      },
      {
        id: 'reading-charts',
        title: 'Reading a Price Chart',
        body: `Most traders read price using candlestick charts. Each candle shows the open, high, low, and close price for a time period (a minute, an hour, a day). A candle's body shows the open-to-close range; its wicks show the high and low reached during that period.

Support is a price level where buying pressure has historically stopped a decline; resistance is a level where selling pressure has historically stopped a rise. These are zones of probability, not guarantees — price breaks through them often.

Timeframe matters: a "strong uptrend" on a 5-minute chart can be a small blip on a daily chart. Beginners get into trouble mixing timeframes, for example holding a "quick trade" for days because it moved against them. Decide your timeframe and your exit plan before you enter, not after.`,
      },
      {
        id: 'risk-management',
        title: 'Building a Risk Management Plan',
        body: `Risk management is the single biggest difference between traders who last and traders who blow up their accounts — more than any indicator or strategy.

A workable starting framework:
- Risk a small, fixed percentage of your account on any single trade (many professionals use 1% or less).
- Always set a stop-loss before you enter, and honor it — don't move it further away when a trade goes wrong.
- Only take a trade if the potential reward is meaningfully larger than the risk (a common minimum is 1.5–2x).
- Keep a trading journal: entry, exit, reason for the trade, and what you'd do differently. Patterns in your own mistakes are more valuable than any signal.

No risk plan removes the possibility of losing money. Forex trading carries real risk of loss, including losing more than you deposit if you use leverage carelessly — treat any course, including this one, as education, not a promise of profit.`,
      },
    ],
  },
  {
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

export const COURSE_PRICE_UGX = 20000;
export const REFERRAL_BONUS_UGX = 5000;

// Shown to users during manual payment. Update this to your real Airtel Money number.
export const MERCHANT_PHONE_DISPLAY = '0703 923 900';

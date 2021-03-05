# Funds Library

This is a mutual funds library app to track all the funds that a potential investor might be interested in.

### Key features

* Authenticated login for onboarding of new funds and fund management.
* Browsing and search function for funds.
* Portfolio simulator.

### Approach

* Create user model and authentication layer.
* Create fund model.
* Create RESTful routes for fund management.
* Create search function for funds.
* Add nav header.
* Create portfolio simulator.
* Add design and styling.

## Portfolio simulator

The portfolio simulator works like a "Robo advisor". It evaluates the input for 3 key questions and compiles a generic portfolio that suits the profile of the investor.

The 3 key questions are regarding:

* Risk Appetite - the risk tolerance of the investor.
* Payment Type - the preferred mode of investment.
* Time Horizon - the time horizon for expected returns.

### Assumptions

* Equity investments ie. stocks, are considered higher risk compared to fixed income investments ie. bonds.

* Because all the funds are mutual funds, there is already some level of diversification across the sub asset classes.

* The risk ratings classification for each individual funds reflects the actual "risk" of investment.

### Logic

The portfolio simulator takes a slightly different approach to the "Balanced portfolio" strategy, which follows a 50/50 split of funds between equities and debt. It takes into account the risk tolerance of an investor to determine the equity to debt ratio of the portfolio.

Equity to Debt ratio:

* Conservative - 1:2

* Aggressive - 2:1

Based on the time horizon for expected return on investment, the portfolio simulator will select the most appropriate funds that safeguards capital as well as maximise returns.

Time Horizon:

* Long - Investor will be able to "ride out" underperforming cycles of the funds, and maximise return on investments by selecting from full spectrum of the funds in the library.

* Short - Investor expect returns soon, thus capital preservation is important. Only funds from the lower risk segments are selected.

Funds will be selected based on the modes of investment available to the investor in Singapore.

Payment Type:

* Cash
* CPF-OA
* CPF-SA
* SRS


If there are insufficient funds to meet the criteria of the investor's profile, it will indicate as such.

## Plans for future updates

* Include UI that logs details of new fund onboarding and fund maintenance.

* Include maintenance feature for users maintenance.

* Upgrade portfolio simulator to compare across other instruments, ie. that are not mutual funds like individual securities.

* Upgrade algorithm of portfolio simulator to evaluate funds qualitatively.

### Link

https://calvan-fund.herokuapp.com/library





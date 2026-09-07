# Member 5: Smart Matching + Skill Gap

Problem statement: Cooperative Gig Services Platform for Household & Community Services

## Responsibility

Build the provider recommendation and skill-gap experience that connects a customer request with the most suitable cooperative worker.

## Task 1: Matching data model

Create a normalized model for:

- Customer service request
- Required service category and sub-skills
- Location and maximum travel distance
- Preferred date and time
- Worker skills, experience, rating, completed jobs, availability, and location
- Worker verification and current workload

Keep the model ready for API integration. Do not hard-code matching rules inside UI components.

## Task 2: Matching score

Implement a reusable matching function that ranks available workers using:

- Skill match: 40%
- Distance: 20%
- Availability: 15%
- Rating and completed jobs: 15%
- Experience: 10%

The function should return a score from 0 to 100 and an explanation for the recommendation, such as:

> Best match because the worker has the required plumbing skills, is available at the selected time, and is 1.2 km away.

## Task 3: Smart recommendations UI

Create the provider recommendation states:

- Best match
- Other recommended workers
- No exact match
- No workers available for the selected slot
- Loading recommendations
- Matching service error

Each worker card should show:

- Match percentage
- Why this worker is recommended
- Verified badge
- Skills and experience
- Distance
- Rating and completed jobs
- Availability
- Select worker action

## Task 4: Skill-gap detection

When no worker has every requested skill, detect the missing skill and show:

- Requested skill
- Available related skills
- Number of workers missing the skill
- Suggested training category
- Whether the request can be fulfilled by combining two workers

Example:

> No worker currently has both AC installation and electrical wiring. Consider assigning an appliance specialist and an electrician together.

## Task 5: Admin skill-gap dashboard

Add an admin-facing view that helps the cooperative identify local training needs:

- Most requested skills
- Skills with the fewest verified workers
- Unfulfilled requests by service category
- Recommended training priorities
- Workers eligible for upskilling
- Exportable skill-gap report

## Task 6: Integration

Connect the recommendation result to the customer booking flow:

1. Customer selects a service.
2. Customer selects date, time, and address.
3. Matching runs using the request details.
4. Recommended workers appear first.
5. Customer can inspect the explanation and choose a worker.
6. If there is a gap, the customer sees a clear alternative instead of an empty screen.

## Acceptance criteria

- Matching logic is a separate reusable module.
- Results are deterministic for the same request and worker data.
- A worker who is unavailable cannot be recommended as available.
- Distance and skill mismatches are visible to the user.
- Empty, loading, and error states are implemented.
- Skill-gap data can be used by both customer and admin views.
- UI works on desktop and mobile.
- Unit tests cover exact match, partial match, unavailable worker, and no-match cases.

## Suggested deliverables

- `matching.js` or `matching.ts`
- `matching.test.js` or `matching.test.ts`
- `SkillGapPanel.jsx`
- `RecommendationCard.jsx`
- `AdminSkillGaps.jsx`
- API/data contract documentation

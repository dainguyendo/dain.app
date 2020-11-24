---
title: Life post install
date: "2019-03-31T22:40:32.169Z"
description: Within software development, there lies a life post install.
---

A perk of developing in JavaScript is it's access to [NPM](https://www.npmjs.com/). The NPM ecosystem is vibrant and vast in comparison to other package managers. In my experience, this creates a unique characteristic for JavaScript community but nonetheless relatable to other forms.

```node
npm install
```

Package managers make it as simple as the above which accelerates software development. In the spirit of keeping things **DRY** (Don't Repeat Yourself) and avoid reinventing the wheel, shareable software in this distributed ecosystem is attractive. Open source packages help focus on core development.

Though it is easy to incorporate these packages, the work does not end here. Authors of the package have created the software that you consume, but the onus falls on the consumer to maintain their work symbiotically within your own code.

### What's the problem?

> _We often `install`, and rarely **maintain**._

Within this landscape, software evolves - hopefully in an iterable fashion. Sometimes minor, sometimes major. There lies beauty in change however may present obstacles to achieve new features, and longterm code.

The problem presents itself most often where introducing to new software. This is where code breaks, where dependencies throw errors and do not play nicely. Additional work is required to resolve conflicts and allow coexistence between modules.

The larger the difference between software dependencies, the more difficult the effort to resolve will be.

Authors may be observant of this issue in some cases. You may have seen things such as migration guides to help the consumer. There should not be an expectation resources like this will be present nor cover material for anything older that what is recent.

**This is the problem of the consumer, not the authors.**

### Develop a process for maintenence

Maintenence will always be a problem, there is no avoiding this with the exception of abandonment. With a process in place, teams can be proactive in facing this problem. Reducing conflicts in the name of the game. The process could include these ideas:

- Regular evaluations of consumed packages
- Regular reports to a manager of state of packages
- An observant eye for installed modules

What is there to gain from such process?

- Security - vulnerabilities may exist and may not be addressed until later iterations
- Awareness - a greater understanding of the codebase and it's dependencies
- Proactive step in reducing future conflicts - introductions to new software or upgrades have been kept in mind

### Within software development, there lies a life post install.

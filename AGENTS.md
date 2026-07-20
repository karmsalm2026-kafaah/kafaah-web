<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## UI Engineering Standards

**MANDATORY:** Before making ANY UI/frontend change, consult the `ui-playbook` skill located at `.agent/skills/ui-playbook/SKILL.md`.

All UI work must comply with the **Enterprise Responsive UI Engineering Playbook**:

- Responsive-first from 360px minimum viewport
- WCAG 2.2 AA accessibility compliance
- Design system consistency (tokens in `globals.css`)
- Enterprise-grade visual polish
- Performance-first rendering
- Production acceptance checklist before completion

Reference the full playbook at `UI Playbook.md` in the project root for the complete 10-part specification.

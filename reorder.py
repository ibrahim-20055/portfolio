import os
import re

path = r'index.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

def extract_section(id_name):
    pattern = r'<section id="' + re.escape(id_name) + r'".*?</section>'
    match = re.search(pattern, html, re.DOTALL)
    if not match:
        print(f"Missing section: {id_name}")
    return match.group(0) if match else ""

hero = extract_section('hero')
about = extract_section('about')
expertise = extract_section('expertise')
brand = extract_section('brand-persona')
audience = extract_section('audience-persona')
copywriting = extract_section('copywriting-approach')
case_studies = extract_section('case-studies')
impact = extract_section('impact')
cv = extract_section('cv')
contact = extract_section('contact')

# Fix Case Studies
ai_block_pattern = r'[ \t]*<div class="cs-block">\s*<h3>AI Course Strategy – FOMO Funnel \(Short\)</h3>.*?Seat limitation was quality-based, not artificial scarcity\.\s*</div>'
case_studies = re.sub(ai_block_pattern, '', case_studies, flags=re.DOTALL)

# Fix Expertise name
expertise = expertise.replace('<h2>Core Capabilities</h2>', '<h2>Growth Framework</h2>')

ai_strategy = """        <!-- AI COURSE STRATEGY SECTION -->
        <section id="ai-course-strategy" class="section-padding">
            <div class="section-header">
                <h2>AI Course Strategy – FOMO Funnel (Short)</h2>
                <p>The AI course marketing strategy was structured around a funnel-based FOMO framework:</p>
            </div>
            <div class="cv-container" style="white-space: pre-wrap; line-height: 1.8;">               • Awareness – education + myth breaking
               • Engagement – live sessions + social proof
               • Consideration – before/after identity positioning
               • Conversion – limited seats, deadlines, urgency, acceptance waves
               • Authority Reinforcement – launch coverage and readiness messaging

               Seat limitation was quality-based, not artificial scarcity.</div>
        </section>"""

brand = brand.replace('class="section-padding"', 'class="section-padding bg-alt"')
audience = audience.replace('class="section-padding bg-alt"', 'class="section-padding"')
case_studies = case_studies.replace('class="case-studies section-padding"', 'class="case-studies section-padding bg-alt"')
copywriting = copywriting.replace('class="section-padding bg-alt"', 'class="section-padding"')

new_main = "\n\n".join([hero, about, brand, audience, expertise, ai_strategy, case_studies, copywriting, impact, cv, contact])

main_pattern = r'(<main>).*?(</main>)'
new_html = re.sub(main_pattern, r'\1\n' + new_main + r'\n    \2', html, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Reorder successful.")


$path = "index.html"
$html = [IO.File]::ReadAllText($path)

def extract_section(id_name):

function Extract-Section($id) {
    if ($html -match '(?s)[ \t]*<!--[ \w-]*-->\s*<section id="' + $id + '".*?</section>') {
        return $matches[0]
    }
    return ""
}

$hero = Extract-Section "hero"
$about = Extract-Section "about"
$expertise = Extract-Section "expertise"
$brand = Extract-Section "brand-persona"
$audience = Extract-Section "audience-persona"
$copywriting = Extract-Section "copywriting-approach"
$case_studies = Extract-Section "case-studies"
$impact = Extract-Section "impact"
$cv = Extract-Section "cv"
$contact = Extract-Section "contact"

# Remove AI block from Case Studies
$ai_pattern = '(?s)[ \t]*<div class="cs-block">\s*<h3>AI Course Strategy[^\<]+</h3>.*?Seat limitation was quality-based, not artificial scarcity\.\s*</div>'
$case_studies = $case_studies -replace $ai_pattern, ''

# Fix Growth Framework
$expertise = $expertise.Replace('<h2>Core Capabilities</h2>', '<h2>Growth Framework</h2>')

$ai_strategy = @"
        <!-- AI COURSE STRATEGY SECTION -->
        <section id="ai-course-strategy" class="section-padding">
            <div class="section-header">
                <h2>AI Course Strategy – FOMO Funnel (Short)</h2>
                <p>The AI course marketing strategy was structured around a funnel-based FOMO framework:</p>
            </div>
            <div class="cv-container" style="white-space: pre-wrap; line-height: 1.8;">
                • Awareness – education + myth breaking
                • Engagement – live sessions + social proof
                • Consideration – before/after identity positioning
                • Conversion – limited seats, deadlines, urgency, acceptance waves
                • Authority Reinforcement – launch coverage and readiness messaging

                Seat limitation was quality-based, not artificial scarcity.
            </div>
        </section>
"@

$brand = $brand.Replace('class="section-padding"', 'class="section-padding bg-alt"')
$audience = $audience.Replace('class="section-padding bg-alt"', 'class="section-padding"')
$case_studies = $case_studies.Replace('class="case-studies section-padding"', 'class="case-studies section-padding bg-alt"')
$copywriting = $copywriting.Replace('class="section-padding bg-alt"', 'class="section-padding"')

$new_main = $hero + "`n`n" + $about + "`n`n" + $brand + "`n`n" + $audience + "`n`n" + $expertise + "`n`n" + $ai_strategy + "`n`n" + $case_studies + "`n`n" + $copywriting + "`n`n" + $impact + "`n`n" + $cv + "`n`n" + $contact

$html = $html -replace '(?s)(<main>).*?(</main>)', ('$1' + "`n" + $new_main + "`n    " + '$2')

[IO.File]::WriteAllText($path, $html)
Write-Output "PowerShell Reorder Successful"




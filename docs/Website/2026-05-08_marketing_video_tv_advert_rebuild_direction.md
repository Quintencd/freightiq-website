# 2026-05-08 - Marketing video TV advert rebuild direction

## Context

Reviewed the current website marketing video placement in the canonical marketing site folder:

- Homepage modal preview: `index.html`
- Walkthrough hero video: `walkthroughs/index.html`
- Current public asset: `assets/videos/flowiq-overview-sales-pitch-v12.mp4`
- Current poster: `assets/videos/flowiq-overview-sales-pitch-v12-poster.jpg`

The customer feedback is directionally valid: v12 is more polished than the early samples, but it still repeats a similar voiceover-led slide structure for too long. The right fix is a rebuild of the video structure, not another small colour or copy tweak.

## Canva Work

- Uploaded the current public v12 MP4 into Canva as a review asset:
  - Canva asset id: `VAHJFxuWSvg`
  - Asset name: `FlowIQ website marketing video v12 current review asset`
  - Source URL: `https://www.flowiq.info/assets/videos/flowiq-overview-sales-pitch-v12.mp4`
- Created an editable Canva creative direction document:
  - Design id: `DAHJFyQNLTI`
  - Edit URL: `https://www.canva.com/d/jvTYcpbj-K7xd5j`
  - View URL: `https://www.canva.com/d/Z4fi5MWlcNkU5Yd`

## Rebuild Direction

Move from a slide-video to a 60-75 second advert-style product film.

Keep FlowIQ orange as an accent only. Avoid orange-dominant backgrounds. Use deeper navy, charcoal, graphite, light grey, muted teal and clean white scenes, with orange reserved for highlights, route lines, CTA buttons and critical metrics.

Recommended scene structure:

1. Fragmented operations problem
   - Dark network of disconnected stock, sales, invoice, branch and finance signals.
   - Use subtle flicker, broken routes and shallow camera movement.
2. FlowIQ system reveal
   - FlowIQ logo resolves the disconnected routes into one operating layer.
   - Use a clean cinematic logo reveal, not a static title slide.
3. ImportIQ / landed cost
   - Move through containers, shipment paths and landed-cost data overlays.
   - Show cost signals attaching to stock, not a generic dashboard card.
4. InventoryIQ / ForecastIQ
   - Shift into warehouse and planning visuals with moving SKU demand and replenishment pulses.
   - Use graph motion and stock-flow animation.
5. SalesIQ / InvoiceIQ
   - Convert order flow into invoice flow using clear process animation.
   - Faster rhythm here to make the business movement feel live.
6. AccountingIQ / PayrollIQ
   - Use calmer premium finance visuals, balanced books, payroll approval and month-end close cues.
   - Background should differ clearly from the logistics and warehouse scenes.
7. TaskIQ / branch control
   - Show task ownership, overdue work, branch oversight and manager visibility.
   - Use map/grid movement or split-screen operational control.
8. Final conversion
   - Clean white or deep navy finish with FlowIQ logo, one-line outcome and Book Demo CTA.
   - Hold long enough for the CTA to register.

## Motion Rules

- Every scene needs a visibly different composition: full-bleed photo/video, UI overlay, kinetic data map, split-screen, dashboard close-up, chart motion and CTA finish.
- Avoid repeating the same left-copy/right-image layout.
- Use transitions that carry information forward:
  - broken route lines become connected routes
  - inventory pulses become forecast curves
  - order cards become invoices
  - finance values become report charts
- Keep on-screen copy short. The voiceover should explain; visuals should prove movement.

## Website Placement

Do not replace v12 on the website until the rebuilt video is exported and reviewed.

When ready:

- Homepage should use a shorter 20-30 second cut or poster-modal entry.
- `/walkthroughs` can host the full 60-75 second version.
- Module pages should get separate module-specific clips, not the same overview video repeated everywhere.

## Review Preview

Created a local standalone review page for the v13 creative direction:

- `video-preview.html`

This is an animated web preview, not the final exported MP4. It exists so the creative direction can be reviewed quickly before replacing the public `v12` video asset. It uses the existing generated website imagery, FlowIQ logo, and canvas-based motion to test the new scene rhythm:

- disconnected operations
- FlowIQ system reveal
- landed cost control
- inventory and forecasting
- sales to invoicing
- finance and payroll
- task and branch control
- final Book Demo CTA

2026-05-08 polish pass:

- Watched the browser playback directly in Chrome using the local preview route.
- Fixed the opening scene so operational node labels no longer cross the headline.
- Fixed the first-frame transition so the preview opens on content instead of a blank dark frame.
- Updated the player controls to keep `Replay` on the same row at desktop widths.
- Improved the FlowIQ reveal by using the white logo treatment and removing micro-copy that collided with the Tasks node.
- Added a subtle film texture, light sweep, and scene transition layer to make the preview feel more like moving video and less like static slides.
- Reworked the sales-to-invoice scene with stronger visual rhythm, active workflow cards and supporting copy.
- Tightened finance and CTA copy wrapping so large headings do not clip at the right edge.

2026-05-08 customer review follow-up:

- Replaced the green/teal motion lines, status pills and chart accents with FlowIQ orange.
- Reworked the small chart cards into a cleaner reusable `drawMetricCard(...)` treatment with baseline, line, endpoint and stronger spacing.
- Reworked the ForecastIQ demand visual into a cleaner orange demand-signal card.
- Renamed the branch-control cards from region names to `Branch 1`, `Branch 2` and `Branch 3`.
- Changed branch card colour chips to orange numbered markers so they no longer introduce unrelated green/blue accents.
- Removed readable module node pills from the opening problem scene because they looked like the next slide bleeding through. The opening now uses only abstract orange route lines behind the problem message.

2026-05-08 v13 polished product advert pass:

- Recut the review preview to a 70 second structure with a separate fast operational hook, system snap reveal, longer product-proof middle scenes and a shorter final CTA.
- Updated `video-preview.html` so the review route is now intended to be viewed as `video-preview?v=8`.
- Added stronger product proof overlays inside the ImportIQ, InventoryIQ/ForecastIQ and AccountingIQ/PayrollIQ scenes so the cut feels more like a product film and less like a generic brand advert.
- Kept the middle of the cut less logo-heavy. FlowIQ orange is used as the action accent for routes, chart lines, status pills and CTA treatment.
- Created a Canva v13 production storyboard because the original Canva creative-direction doc is not editable through the connector:
  - Design id: `DAHJGjqtqkI`
  - Edit URL: `https://www.canva.com/d/4gz3uVInhNJZKrw`
  - View URL: `https://www.canva.com/d/boQALEU1i1CNZtU`
- Created local review assets for approval:
  - Review MP4: `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - Review poster: `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
  - Timing voiceover: `assets/videos/flowiq-overview-sales-pitch-v13-review-voiceover.m4a`
- The review MP4 is 1920x1080, 70 seconds, 24fps, H.264/AAC, approximately 9.2 MB.
- The local review voiceover was switched back to macOS `Samantha` after the `Reed (English (US))` timing track tested poorly and sounded too robotic. This is still only a timing/reference narration, not a final Canva-generated or studio-quality human voiceover. Use the Canva storyboard and script as the production handoff for the final Canva voice/audio pass.
- The homepage and `/walkthroughs` embeds still point at v12. Do not replace those references until v13 is approved.

2026-05-08 v13 visual polish follow-up:

- Strengthened the reusable pill treatments so scene badges, node pills, branch markers, status pills and playback labels no longer look washed out.
- Moved the FlowIQ logo into the centre of the system-snap reveal rings and shifted the supporting copy lower so the logo reads as the focal point.
- Regenerated `assets/videos/flowiq-overview-sales-pitch-v13.mp4` and `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg` from the updated v9 review preview.
- Production-tool recommendation: use Canva for the editable storyboard and final assembly if staying inside the current connected workflow; use Descript for final voiceover/studio sound cleanup; use Runway only for optional cinematic 5-10 second motion/B-roll inserts; use Adobe Premiere/After Effects if the final finish needs true production-house motion graphics and edit control.

2026-05-08 voiceover rollback:

- Replaced the `Reed (English (US))` reference audio with the previous `Samantha` voice because Reed sounded unnatural in review.
- Re-muxed `assets/videos/flowiq-overview-sales-pitch-v13.mp4` with the Samantha timing voice while preserving the v9 visual polish.

2026-05-09 Creati app production-insert pass:

- Used the native Creati app rather than the web account path because the web login/subscription state was unclear and the user wanted the easier app workflow.
- Generated a no-watermark warehouse/office data-ribbon insert in Creati. The in-app `Download` control returned `Save failed`, so the generated app cache video was preserved in the website repo as:
  - `assets/videos/flowiq-creati-warehouse-data-ribbon-insert.mp4`
- Integrated that Creati insert into the first four seconds of `video-preview.html` as the moving opener background. The FlowIQ overlay, problem cards and orange route lines remain local/canvas controlled so the opening stays specific to FlowIQ instead of becoming generic AI video.
- Rebuilt the local review MP4 and poster:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Current local review route for this pass:
  - `video-preview.html?v=10`
- The rebuilt MP4 remains 1920x1080, 70 seconds, 24fps, H.264/AAC, approximately 8.3 MB.
- The voiceover is still the previous Samantha timing/reference voice. It is not the rejected Reed voice, and it is not a final studio-quality human narration.

2026-05-09 website sales-tool production pass:

- Reframed the v13 cut as a website sales asset for FlowIQ, not a generic cinematic brand advert. The video should help prospects understand the system when the founder sends them a link.
- Kept the existing selling voiceover script as the narrative spine because it explains the FlowIQ system, modules and buyer value.
- Added voiceover-matched lower-third captions in FlowIQ orange so prospects can follow the sales message visually even at low volume.
- Removed the internal scene/debug label from the exported video and replaced it with a subtle FlowIQ mark so the MP4 feels like a finished website asset rather than a review preview.
- Added a low-volume generated ambient music bed underneath the existing voiceover. The bed is intentionally calm and secondary; it should add polish without competing with the narration.
- Added two more grounded Creati-generated inserts and preserved them in the repo:
  - `assets/videos/flowiq-creati-import-logistics.mp4`
  - `assets/videos/flowiq-creati-inventory-planning.mp4`
- Creati returned the new clips in portrait format despite landscape prompting. The final renderer uses them as intentional premium motion panels with FlowIQ overlays rather than stretching them full-screen.
- Updated `video-preview.html` to support multiple Creati video layers while keeping FlowIQ-specific overlays, module names, product cards, orange routes and captions local to the renderer.
- Rebuilt the review MP4 and poster again:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Current local review route for this pass:
  - `video-preview.html?v=11`
- The rebuilt MP4 is 1920x1080, 70 seconds, 24fps, H.264/AAC, approximately 12 MB.

2026-05-09 audio and overlay rollback:

- Removed the generated ambient music bed from the MP4 after review because it made the audio feel worse rather than more professional.
- Rebuilt `assets/videos/flowiq-overview-sales-pitch-v13.mp4` using the previous voiceover-only file:
  - `assets/videos/flowiq-overview-sales-pitch-v13-review-voiceover.m4a`
- Strengthened the top FlowIQ logo treatment from a translucent overlay into a darker fixed brand plaque with clearer logo contrast.
- Strengthened the lower voiceover caption bars so they are less washed out against bright and dark scene backgrounds.
- The rebuilt MP4 remains 1920x1080, 70 seconds, 24fps, H.264/AAC, approximately 11 MB.

2026-05-09 previous-script rollback:

- Rejected the newer generated narration/script because it still sounded robotic and did not match the preferred previous sales message.
- Extracted the approved v12 website narration into:
  - `assets/videos/flowiq-overview-sales-pitch-v13-previous-voiceover.m4a`
- Retimed `video-preview.html` from 70 seconds back to 97.04 seconds so the v13 visuals support the full previous script instead of compressing or replacing it.
- Updated the lower orange captions to follow the earlier sales-script wording:
  - disconnected spreadsheets, outdated ERP systems and manual processes
  - delays, inaccurate costing, poor forecasting, cash-flow pressure and blind spots
  - FlowIQ as the connected operational platform
  - ImportIQ, InventoryIQ, ForecastIQ, SalesIQ, InvoiceIQ, AccountingIQ and PayrollIQ value
  - enterprise-level capability without enterprise-level complexity
  - Book Demo / margin recovery CTA
- Rebuilt the review assets:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Current local review route for this pass:
  - `video-preview.html?v=12`
- Verification:
  - MP4 decodes cleanly with video and audio.
  - Final MP4 is 1920x1080, 24fps, H.264/AAC, 97.04 seconds, approximately 15 MB.
  - Audio stream is AAC stereo at 44.1kHz from the previous v12 voiceover.
- The homepage and `/walkthroughs` embeds still point at v12. Do not replace those references until v13 is approved.

2026-05-09 logo and motion-stability pass:

- Removed the dark rounded plaque and orange line from the persistent FlowIQ logo treatment after review. The recurring brand mark is now a clean transparent top-left logo only.
- Stopped drawing the Creati video clips directly into the import, forecasting and opener scenes because the exported panels could judder in QuickTime playback.
- Replaced those moving clip panels with stable FlowIQ-controlled image panels using the same industry-relevant imagery and subtle renderer-controlled motion. This keeps the cut polished while avoiding AI-video shimmer/shudder.
- Rebuilt:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Verification:
  - MP4 decodes cleanly with video and previous-script audio.
  - Final MP4 is 1920x1080, 24fps, H.264/AAC, 97.04 seconds, approximately 12 MB.

2026-05-09 Creati video restore and logo clearance pass:

- Restored the Creati-generated motion inserts because they add the live advert feel the review cut needs, but processed them into stabilized, no-audio website source clips before rendering the final MP4:
  - `assets/videos/flowiq-creati-warehouse-stabilized.mp4`
  - `assets/videos/flowiq-creati-import-logistics-stabilized.mp4`
  - `assets/videos/flowiq-creati-inventory-planning-stabilized.mp4`
- Reintroduced those stabilized clips in `video-preview.html`:
  - opener warehouse/operations movement
  - ImportIQ landed-cost motion panel
  - InventoryIQ/ForecastIQ planning motion panel
- Reduced the persistent FlowIQ logo treatment again so it is only a small transparent top-left brand mark, with no plaque and no orange divider line. This clears the module pills and stops the logo from sitting on top of scene content.
- Rebuilt:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Verification:
  - MP4 decodes cleanly with video and the previous-script voiceover audio.
  - Final MP4 is 1920x1080, 24fps, H.264/AAC, 97.04 seconds, approximately 15 MB.
  - Spot-check contact sheet confirmed the FlowIQ logo no longer overlaps the module pills in the opener, ImportIQ, ForecastIQ, SalesIQ/InvoiceIQ, finance, branch and CTA scenes.
  - Homepage and `/walkthroughs` references remain on v12 pending v13 approval.

2026-05-09 front-page clarity and render-stability pass:

- Reduced the opener veil so the first page reads as a clear warehouse/office operations scene instead of a faded dark background.
- Removed the slow headline fade on the opener. The first message now appears at full strength so the start of the video does not feel washed out.
- Kept the Creati-produced material in the cut, but changed the final renderer to use selected Creati source frames with controlled camera movement and cross-fades. This preserves the Creati visual direction while avoiding the visible glitches caused by seeking live AI-video clips frame-by-frame during MP4 rendering.
- Added the selected Creati source frames under:
  - `assets/img/generated/video-v13-creati-stills/`
- Rebuilt:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
- Verification:
  - MP4 decodes cleanly with video and the previous-script voiceover audio.
  - Final MP4 is 1920x1080, 24fps, H.264/AAC, 97.04 seconds, approximately 13 MB.
  - Contact sheet from the exported MP4 confirmed no obvious scene-label/logo overlap and no unstable live-video frame jumps in the Creati sections.
  - Homepage and `/walkthroughs` still point at v12 pending v13 approval.

2026-05-09 narration lead-in pass:

- Added a 450ms clean lead-in before the voiceover so the first spoken words are not clipped by QuickTime or browser playback startup.
- Cloned the final frame by the same amount so video and audio stay aligned at the end of the MP4.
- Rebuilt:
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
- Verification:
  - MP4 decodes cleanly with video and audio.
  - Final MP4 is 1920x1080, 24fps, H.264/AAC, 97.96 seconds, approximately 19 MB.
  - First 0.35 seconds measured as silence; speech is present after the lead-in.
  - Homepage and `/walkthroughs` still point at v12 pending v13 approval.

2026-05-09 marketing website approval switch:

- User approved the v13 review cut for the marketing website and will handle the live push.
- Updated the homepage video preview poster and modal source in `index.html`:
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
- Updated the walkthrough hero video poster and source in `walkthroughs/index.html`:
  - `assets/videos/flowiq-overview-sales-pitch-v13-poster.jpg`
  - `assets/videos/flowiq-overview-sales-pitch-v13.mp4`
- Preserved existing load behavior:
  - Homepage modal remains `preload="none"`.
  - Walkthrough hero remains `preload="metadata"`.
- No Netlify deploy was run.

## Regression Risks

- 15-20%: A more cinematic advert can become less literal about the product if it uses too much abstract footage. Mitigation: keep FlowIQ UI overlays and module names present in each operational scene.
- 10-15%: A 60-75 second video may still be too long for homepage conversion. Mitigation: use a short homepage cut and keep the full video on `/walkthroughs`.
- 10-15%: Larger video files can slow mobile page loads. Mitigation: keep `preload="metadata"`, compress MP4/WebM exports, and keep posters optimized.
- 10-15%: Too many motion effects can feel busy. Mitigation: use scene contrast and camera motion, but keep text and UI overlays restrained.
- 15-20%: AI-generated production inserts can look generic or slightly detached from the real product. Mitigation: use Creati footage only as a short opener/transition layer and keep the product story, labels and FlowIQ overlays controlled in the local renderer.
- 10-15%: The Creati app cache file is less ideal than a clean manual export because the app download button failed. Mitigation: preserve the copied MP4 in `assets/videos/`, verify it decodes with ffmpeg, and keep the source note documented here.
- 15-20%: Using too much AI footage can pull the video away from FlowIQ's actual industries. Mitigation: constrain footage to importers, distributors, warehouses, finance, sales/order flow and branch management, and let FlowIQ overlays carry the product proof.
- 10-15%: Portrait AI clips can feel less native in a 16:9 website video. Mitigation: use them as composed motion panels with supporting UI overlays instead of stretching or cropping them aggressively.
- 10-15%: Background music can weaken voiceover clarity if it is too loud. Mitigation: keep the bed low-volume, calm and mixed under the narration.
- 10-15%: Stronger logo and caption overlays can feel too heavy if they dominate the footage. Mitigation: keep them small, consistent and anchored, while using the larger scene copy for the main sales message.
- 10-15%: Returning to the full 97-second previous script may be too long for a homepage modal. Mitigation: keep this as the full website sales-tool cut and consider a separate 25-35 second homepage teaser after approval.
- 10-15%: The lower captions are condensed on-screen support text, not a word-for-word transcript of every spoken phrase. Mitigation: keep the preferred voiceover as the authoritative script and use captions only to reinforce the main sales points.
- 10-15%: Replacing AI video panels with stable image panels reduces some live-motion feel. Mitigation: keep controlled camera drift, route animation, charts and product overlays active while removing the unstable source-video motion.
- 10-15%: Stabilized AI video can still show minor shimmer in some frames. Mitigation: keep Creati footage inside contained panels or short opener moments, remove its original audio, and keep FlowIQ text/product overlays controlled by the local renderer.
- 10-15%: Using selected source frames instead of the full live Creati clips reduces some raw video movement. Mitigation: keep the generated video assets in the repo as source material, use source-derived frames in the render, and add controlled pan/cross-fade motion so the advert remains polished without visible glitches.

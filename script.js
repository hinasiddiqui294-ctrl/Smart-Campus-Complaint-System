const sample = [
{id:1,title:"Wi-Fi not working in Block C",category:"IT & Wi-Fi",location:"Academic Block C",date:"2026-11-16",priority:"High",status:"In Progress",description:"Internet connectivity issue."},
{id:2,title:"Washroom maintenance required",category:"Cleanliness",location:"Library, Ground Floor",date:"2026-11-14",priority:"Medium",status:"Pending",description:"Washroom needs attention."},
{id:3,title:"Classroom projector issue",category:"Infrastructure",location:"Room 204, Block A",date:"2026-11-12",priority:"Medium",status:"Resolved",description:"Projector display was not working."},
{id:4,title:"Hostel water cooler repair",category:"Hostel",location:"Girls Hostel",date:"2026-11-09",priority:"Low",status:"Resolved",description:"Water cooler repaired."},
{id:5,title:"Bus timing update request",category:"Transport",location:"Main Gate",date:"2026-11-07",priority:"Low",status:"In Progress",description:"Request to update the bus schedule."}
];
let complaints=JSON.parse(localStorage.getItem("campusCareComplaints"))||sample;
const $=id=>document.getElementById(id);
const symbols={"Infrastructure":"▦","Cleanliness":"✧","IT & Wi-Fi":"⌁","Hostel":"⌂","Academic":"▤","Transport":"↗","Other":"•"};
const pad=n=>String(n).padStart(2,"0");
function save(){localStorage.setItem("campusCareComplaints",JSON.stringify(complaints));}
function updateStats(){
 const counts={"Pending":0,"In Progress":0,"Resolved":0};complaints.forEach(c=>counts[c.status]++);
 $("totalCount").textContent=pad(complaints.length);$("progressCount").textContent=pad(counts["In Progress"]);$("resolvedCount").textContent=pad(counts.Resolved);$("pendingCount").textContent=pad(counts.Pending);
 $("ringTotal").textContent=complaints.length;$("legendResolved").textContent=pad(counts.Resolved);$("legendProgress").textContent=pad(counts["In Progress"]);$("legendPending").textContent=pad(counts.Pending);
 const total=complaints.length||1,a=counts.Resolved/total*100,b=(counts.Resolved+counts["In Progress"])/total*100;
 $("activityRing").style.background=`conic-gradient(#6959c8 0 ${a}%,#e4ad56 ${a}% ${b}%,#72a9d1 ${b}% 100%)`;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 updateStats();
 const q=$("search").value.toLowerCase(),st=$("statusFilter").value,cat=$("categoryFilter").value;
 const rows=complaints.filter(c=>(st==="all"||c.status===st)&&(cat==="all"||c.category===cat)&&(c.title.toLowerCase().includes(q)||c.location.toLowerCase().includes(q)||c.category.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));
 $("complaintRows").innerHTML=rows.map(c=>`<tr><td><div class="complaint-cell"><span class="complaint-symbol">${symbols[c.category]||"•"}</span><div>${esc(c.title)}<small>${esc(c.location)} · #CC-${String(c.id).slice(-4)}</small></div></div></td><td>${esc(c.category)}</td><td>${new Date(c.date+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td><td><span class="priority-${c.priority.toLowerCase()}">${c.priority}</span></td><td><span class="badge status-${c.status==="In Progress"?"progress":c.status.toLowerCase()}">${c.status}</span></td><td><button class="row-more" data-id="${c.id}" aria-label="View complaint details">···</button></td></tr>`).join("");
 $("empty").hidden=rows.length>0;
}
function openModal(){$("modal").classList.add("show");$("modal").setAttribute("aria-hidden","false");$("title").focus();}
function closeModal(){$("modal").classList.remove("show");$("modal").setAttribute("aria-hidden","true");}
function showToast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2500);}
$("newComplaint").addEventListener("click",openModal);$("closeModal").addEventListener("click",closeModal);
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))closeModal();});
$("complaintForm").addEventListener("submit",e=>{
 e.preventDefault();const c={id:Date.now(),title:$("title").value.trim(),category:$("category").value,location:$("location").value.trim(),date:new Date().toISOString().slice(0,10),priority:$("priority").value,status:"Pending",description:$("description").value.trim(),email:$("email").value.trim()};
 complaints.push(c);save();render();e.target.reset();closeModal();showToast("Your complaint has been submitted ✓");
});
["search","statusFilter","categoryFilter"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",render));
$("viewAll").addEventListener("click",()=>{$("statusFilter").value="all";$("categoryFilter").value="all";$("search").value="";render();$("complaints").scrollIntoView({behavior:"smooth"});});
$("complaintRows").addEventListener("click",e=>{const btn=e.target.closest("[data-id]");if(!btn)return;const c=complaints.find(x=>String(x.id)===btn.dataset.id);if(c)alert(`Complaint: ${c.title}\nCategory: ${c.category}\nLocation: ${c.location}\nPriority: ${c.priority}\nStatus: ${c.status}\n\n${c.description||""}`);});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
render();

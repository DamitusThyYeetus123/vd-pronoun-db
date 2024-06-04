(function(S,d,e,D,n,X,l,E,p,J){"use strict";var m={Failed:l.getAssetIDByName("Small"),Delete:l.getAssetIDByName("ic_message_delete"),Copy:l.getAssetIDByName("toast_copy_link"),Open:l.getAssetIDByName("ic_leave_stage"),Clipboard:l.getAssetIDByName("pending-alert"),Clock:l.getAssetIDByName("clock"),Pronoun:l.getAssetIDByName("ic_accessibility_24px"),Settings:{Toasts:{Settings:l.getAssetIDByName("ic_selection_checked_24px"),Failed:l.getAssetIDByName("ic_close_circle_24px")},Initial:l.getAssetIDByName("coffee"),Update:l.getAssetIDByName("discover"),Locale:l.getAssetIDByName("ic_locale_24px"),External:l.getAssetIDByName("ic_raised_hand_list"),Edit:l.getAssetIDByName("ic_edit_24px")}},b={shadow:(a=.1)=>({shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:a,shadowRadius:4.65,elevation:8}),displayToast:(a,i)=>{e.toasts.open({content:i=="clipboard"?`Copied ${a} to clipboard.`:a,source:i=="clipboard"?m.Clipboard:m.Settings.Initial})}},_=(a,i,t,r,o)=>{try{return a(...i)}catch(s){console.warn(`[${t}] The following error happened when trying to ${r} ${o??"unspecificied label"}: ${s}`);return}};const N=(a,i,t,r)=>_(()=>{if(a){a.length++,t++;for(let o=a.length-1;o>=t;o--)a[o]=a[o-1];return a[t-1]=i,a.length}},[a,i,t],n.manifest.name,"insert an item at",r);var k={mapItem:(a,i,t)=>_(()=>{let r=[];for(let o=0;o<a.length;o++)N(r,i(a[o],o,a),r.length);return r},[a,i],n.manifest.name,"map an array at",t),insertItem:N},c={map:{},queue:[],fetching:!1,referenceMap:{hh:"he/him",hi:"he/it",hs:"he/she",ht:"he/they",ih:"it/him",ii:"it/its",is:"it/she",it:"it/they",shh:"she/he",sh:"she/her",si:"she/it",st:"she/they",th:"they/he",ti:"they/it",ts:"they/she",tt:"they/them",any:"any",other:"other",ask:"ask",avoid:"avoid, use name",unspecified:"unspecified"},async updateQueuedPronouns(){if(this.queue.length<=0||this.fetching)return;const a=this.queue.splice(0,49),i=s=>this.queue.length<=0?s:this.map[s]?i(this.queue.shift()):s;for(const s of a)this.map[s]&&(a[s]=i(s));this.fetching=!0;const t=await(await fetch(`https://pronoundb.org/api/v2/lookup?platform=discord&ids=${a.join(",")}`,{method:"GET",headers:{Accept:"application/json","X-PronounDB-Source":"Vendetta"}})).json();var r=new Map;Object.keys(t).forEach(s=>{var y=t[s].sets.en.findIndex(R=>["ask","any","avoid","other"].includes(R)),h=t[s].sets.en.length;if(y>=0)r.set(s,t[s].sets.en[y]);else if(h==1)switch(t[s].sets.en[0]){case"she":r.set(s,"sh");break;case"he":r.set(s,"hh");break;case"they":r.set(s,"tt");break;case"it":r.set(s,"ii");break}else if(h==2)switch(t[s].sets.en[0]){case"she":switch(t[s].sets.en[1]){case"he":r.set(s,"shh");break;case"they":r.set(s,"st");break;case"it":r.set(s,"si");break}break;case"he":switch(t[s].sets.en[1]){case"she":r.set(s,"hs");break;case"they":r.set(s,"ht");break;case"it":r.set(s,"hi");break}break;case"they":switch(t[s].sets.en[1]){case"she":r.set(s,"ts");break;case"he":r.set(s,"th");break;case"it":r.set(s,"ti");break}break;case"it":switch(t[s].sets.en[1]){case"she":r.set(s,"is");break;case"he":r.set(s,"ih");break;case"they":r.set(s,"it");break}break}});const o=Object.fromEntries(Object.entries(r).filter(([s,y])=>!isNaN(+s)));Object.assign(this.map,o),this.fetching=!1,this.queue.length>0&&this.updateQueuedPronouns()}},x={plugin:{source:"https://github.com/acquitelol/vd-pronoun-db",pronoundb:"https://pronoundb.org/"},author:{profile:{"Rosie<3":"https://github.com/acquitelol"}}};const{View:O,Text:L,TouchableOpacity:Z}=E.General,{useThemeContext:ee}=d.findByProps("useThemeContext"),{meta:{resolveSemanticColor:te}}=d.findByProps("colors","meta"),ae=d.findByName("UserProfileSection"),{UserProfileGradientCard:se}=d.findByProps("UserProfileGradientCard"),U=d.findByProps("triggerHaptic"),T=e.stylesheet.createThemedStyleSheet({container:{alignSelf:"flex-start",padding:1,borderRadius:9,width:"100%",marginTop:-4,marginRight:-12},innerContainer:{paddingHorizontal:6,paddingVertical:8,overflow:"hidden",flexDirection:"row",justifyContent:"center",alignItems:"center"},circle:{width:10,height:10,borderRadius:10/2,marginRight:6},fallback:{color:p.semanticColors.BACKGROUND_SECONDARY_ALT},text:{fontFamily:e.constants.Fonts.DISPLAY_NORMAL}});var re=({pronoun:a})=>{const i=ee(),t=te(i.theme,p.semanticColors.TEXT_NORMAL);return e.React.createElement(ae,{title:"Pronouns"},e.React.createElement(Z,{onPress:()=>{e.toasts.open({content:a,source:m.Pronoun}),U&&U.triggerHaptic()},style:n.storage.isRole?{justifyContent:"center",alignItems:"center"}:{}},n.storage.isRole?e.React.createElement(se,{style:T.container,fallbackBackground:T.fallback.color},e.React.createElement(O,{style:T.innerContainer},e.React.createElement(O,{style:[T.circle,{backgroundColor:t}]}),e.React.createElement(L,{style:[T.text,{color:t}]},a))):e.React.createElement(L,{style:[T.text,{fontSize:16,color:t}]},a)))};const{TouchableOpacity:I,View:v,Image:ie,Text:A,Animated:P}=E.General,M=d.findByProps("transitionToGuild","openURL"),F=d.findByStoreName("UserStore"),ne=d.findByProps("showUserProfile"),f=e.stylesheet.createThemedStyleSheet({container:{marginTop:25,marginLeft:"5%",marginBottom:-15,flexDirection:"row"},textContainer:{paddingLeft:15,paddingTop:5,flexDirection:"column",flexWrap:"wrap",...b.shadow()},image:{width:75,height:75,borderRadius:10,...b.shadow()},mainText:{opacity:.975,letterSpacing:.25},header:{color:p.semanticColors.HEADER_PRIMARY,fontFamily:e.constants.Fonts.DISPLAY_BOLD,fontSize:25,letterSpacing:.25},subHeader:{color:p.semanticColors.HEADER_SECONDARY,fontSize:12.75}});var oe=({name:a,authors:i})=>{const t=e.React.useRef(new P.Value(1)).current,r=()=>P.spring(t,{toValue:1.1,duration:10,useNativeDriver:!0}).start(),o=()=>P.spring(t,{toValue:1,duration:250,useNativeDriver:!0}).start(),s=()=>ne.showUserProfile({userId:F.getCurrentUser().id}),y={transform:[{scale:t}]};return e.React.createElement(e.React.Fragment,null,e.React.createElement(v,{style:f.container},e.React.createElement(I,{onPress:s,onPressIn:r,onPressOut:o},e.React.createElement(P.View,{style:y},e.React.createElement(ie,{style:[f.image],source:{uri:F?.getCurrentUser()?.getAvatarURL()?.replace("webp","png")}}))),e.React.createElement(v,{style:f.textContainer},e.React.createElement(I,{onPress:()=>M.openURL(x.plugin.source)},e.React.createElement(A,{style:[f.mainText,f.header]},a)),e.React.createElement(v,{style:{flexDirection:"row"}},e.React.createElement(A,{style:[f.mainText,f.subHeader]},"A project by"),k.mapItem(i,(h,R,C)=>e.React.createElement(I,{onPress:()=>M.openURL(x.author.profile[h.name]??"https://github.com/")},e.React.createElement(A,{style:[f.mainText,f.subHeader,{paddingLeft:4,fontFamily:e.constants.Fonts.DISPLAY_BOLD,flexDirection:"row"}]},h.name,R<C.length-1?",":null)))))))};const{View:le,Text:ce}=E.General,V=e.stylesheet.createThemedStyleSheet({text:{color:p.semanticColors.HEADER_SECONDARY,paddingLeft:"5.5%",paddingRight:10,marginBottom:10,letterSpacing:.25,fontFamily:e.constants.Fonts.PRIMARY_BOLD,fontSize:12}});var B=({label:a,children:i})=>e.React.createElement(le,{style:{marginTop:10}},e.React.createElement(ce,{style:[V.text,V.optionText]},a.toUpperCase()),i);const{Image:G}=E.General,he=e.ReactNative.Dimensions?.get("window").width;var Y=({style:a,source:i})=>{const[t,r]=e.React.useState({width:0,height:0}),[o,s]=e.React.useState(0),y=()=>{const h=$=>typeof $=="string"?parseInt($.replace("%",""))*he/100:$,R=h(a.width);if(!a.maxWidth)return R;const C=h(a.maxWidth);return R>C?C:R};return e.React.useEffect(()=>{G.getSize(i,(h,R)=>{r({width:h,height:R})},h=>{console.error(`[${n.manifest.name}] ${h} when fetching ${i}`)}),s(y())},[]),e.React.createElement(G,{style:[...Array.isArray(a)?a:[a],{height:o*(t.height/t.width)}],source:{uri:i},resizeMode:"stretch"})};const{FormRow:g,FormSwitch:H,FormDivider:j}=E.Forms,{ScrollView:de,View:w,Text:pe}=E.General,q=d.findByProps("transitionToGuild","openURL"),u=e.stylesheet.createThemedStyleSheet({icon:{color:p.semanticColors.INTERACTIVE_NORMAL},item:{color:p.semanticColors.TEXT_MUTED,fontFamily:e.constants.Fonts.PRIMARY_MEDIUM},container:{width:"90%",marginLeft:"5%",borderRadius:10,backgroundColor:p.semanticColors.BACKGROUND_MOBILE_SECONDARY,...b.shadow()},subheaderText:{color:p.semanticColors.HEADER_SECONDARY,textAlign:"center",margin:10,marginBottom:50,letterSpacing:.25,fontFamily:e.constants.Fonts.PRIMARY_BOLD,fontSize:14},image:{width:"100%",maxWidth:350,borderRadius:10}});var ue=()=>{J.useProxy(n.storage);const[a,i]=e.React.useState(n.storage.isTimestamp),[t,r]=e.React.useState(n.storage.isRole);return e.React.createElement(de,null,e.React.createElement(oe,{name:n.manifest.name,authors:n.manifest.authors}),e.React.createElement(w,{style:{marginTop:20}},e.React.createElement(B,{label:"Preferences"},e.React.createElement(w,{style:[u.container]},e.React.createElement(g,{label:"Timestamps",subLabel:"Use Timestamps instead of OP Tag for the pronoun in the chat area.",onLongPress:()=>b.displayToast(`By default, ${n.manifest.name} will use the OP tag to display pronouns. Toggling this option will always use Timestamps instead of OP tag for pronouns.`,"tooltip"),leading:e.React.createElement(g.Icon,{style:u.icon,source:m.Settings.Locale}),trailing:e.React.createElement(H,{value:n.storage.isTimestamp,onValueChange:()=>{n.storage.isTimestamp=!n.storage.isTimestamp,i(n.storage.isTimestamp)}})}),e.React.createElement(j,null),e.React.createElement(g,{label:"Roles",subLabel:"Show the pronoun styled as a role instead of plain text inside of profiles.",onLongPress:()=>b.displayToast(`With this option enabled, ${n.manifest.name} will style pronouns as roles in profiles. Otherwise, it will style them as plain text.`,"tooltip"),leading:e.React.createElement(g.Icon,{style:u.icon,source:m.Settings.Edit}),trailing:e.React.createElement(H,{value:n.storage.isRole,onValueChange:()=>{n.storage.isRole=!n.storage.isRole,r(n.storage.isRole)}})}))),e.React.createElement(B,{label:"Previews"},e.React.createElement(w,{style:{...u.container,maxWidth:350}},e.React.createElement(Y,{style:u.image,source:`https://cdn.discordapp.com/attachments/${a?"1011346757214543875/1075007230337896448/pronoun-timestamp.png":"1011346757214543875/1075007230107193374/pronoun-tag.png"}`})),e.React.createElement(w,{style:{...u.container,marginTop:10,maxWidth:350}},e.React.createElement(Y,{style:u.image,source:`https://cdn.discordapp.com/attachments/${t?"1011346757214543875/1075007778399199282/profile-role.png":"1011346757214543875/1075007778067841044/profile-plain.png"}`}))),e.React.createElement(B,{label:"Source"},e.React.createElement(w,{style:u.container},e.React.createElement(g,{label:"Source",subLabel:`Open the repository of ${n.manifest.name} externally.`,onLongPress:()=>b.displayToast(`Opens the repository of ${n.manifest.name} on GitHub in an external page to view any source code of the plugin.`,"tooltip"),leading:e.React.createElement(g.Icon,{style:u.icon,source:m.Open}),trailing:()=>e.React.createElement(g.Arrow,null),onPress:()=>{q.openURL(x.plugin.source)}}),e.React.createElement(j,null),e.React.createElement(g,{label:"PronounDB",subLabel:`Open the ${n.manifest.name} website externally at \`https://pronoundb.org\`.`,onLongPress:()=>b.displayToast("Opens the PronounDB website in an external page which allows you to link your Discord account to PronounDB.","tooltip"),leading:e.React.createElement(g.Icon,{style:u.icon,source:m.Settings.External}),trailing:()=>e.React.createElement(g.Arrow,null),onPress:()=>{q.openURL(x.plugin.pronoundb)}})))),e.React.createElement(pe,{style:u.subheaderText},`Build: (${n.manifest.hash.substring(0,8)})`))};const ge=d.find(a=>a?.type?.name=="UserProfile"),fe=d.findByStoreName("UserStore"),{DCDChatManager:ye}=e.ReactNative.NativeModules,z=e.stylesheet.createThemedStyleSheet({opTagBackgroundColor:{color:p.semanticColors.HEADER_PRIMARY},opTagTextColor:{color:p.semanticColors.BACKGROUND_PRIMARY}});let W,K,Q;var Re={onLoad:()=>{W=D.before("getUser",fe,a=>{const i=a[0];c.map[i]||k.insertItem(c.queue,i,c.queue.length,"user id pronoun queue"),c.updateQueuedPronouns()}),K=D.after("type",ge,(a,i)=>{const t=X.findInReactTree(i,s=>s?.type?.displayName==="View"&&s?.props?.children.findIndex(y=>y?.type?.name==="UserProfileBio")!==-1)?.props?.children;if(!t)return i;const{userId:r}=t?.find(s=>typeof s?.props?.displayProfile?.userId=="string")?.props?.displayProfile??{};if(!r||!c.map[r]||c.referenceMap[c.map[r]]==="unspecified")return i;const o=c.referenceMap[c.map[r]];t.unshift(React.createElement(re,{pronoun:o}))}),Q=D.before("updateRows",ye,a=>{const i=JSON.parse(a[1]);for(const t of i){if(t.type!==1||!t?.message?.authorId||!c.map[t?.message?.authorId]||c.referenceMap[c.map[t?.message?.authorId]]==="unspecified")continue;const r=c.referenceMap[c.map[t.message.authorId]];if(n.storage.isTimestamp&&t.message.timestamp){t.message.timestamp+=" \u2022 "+r;continue}t.message.opTagText&&(t.message.tagText=t.message.tagText?t.message.tagText+" \u2022 ":""+t.message.opTagText),t.message.opTagText=r,t.message.opTagTextColor=e.ReactNative.processColor(z.opTagTextColor.color),t.message.opTagBackgroundColor=e.ReactNative.processColor(z.opTagBackgroundColor.color)}a[1]=JSON.stringify(i)})},onUnload:()=>{W?.(),K?.(),Q?.()},settings:ue};return S.default=Re,Object.defineProperty(S,"__esModule",{value:!0}),S})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.utils,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.storage);

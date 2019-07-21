# tinysnitch
A demonstration of Little Snitch-like tool for Linux.

## how to run

```
$ sudo journalctl -b -f --since now --utc -o json | grep "\[UFW" | node tinysnitch.js
```

## log example

```
{"_TRANSPORT":"kernel","SYSLOG_FACILITY":"0","__CURSOR":"s=a54dfccdc714454eb27cfa004b157e66;i=1a8baa;b=2f1b03c3e2104787adb361b0dfd671fc;m=4fb2319c;t=58e26cc6725ab;x=4688a3e2f1367d93","PRIORITY":"4","_HOSTNAME":"umetarou","__MONOTONIC_TIMESTAMP":"1337078172","__REALTIME_TIMESTAMP":"1563672172766635","_MACHINE_ID":"87b5dc6a38314e60a8cbb00af491f4fd","_BOOT_ID":"2f1b03c3e2104787adb361b0dfd671fc","_SOURCE_MONOTONIC_TIMESTAMP":"1337051914","SYSLOG_IDENTIFIER":"kernel","MESSAGE":"[UFW AUDIT] IN=wlp2s0 OUT= MAC=a0:c5:89:1b:e9:46:88:1f:a1:2a:fd:22:08:00 SRC=172.217.26.3 DST=10.0.1.20 LEN=52 TOS=0x00 PREC=0x00 TTL=121 ID=18904 PROTO=TCP SPT=80 DPT=38848 WINDOW=240 RES=0x00 ACK URGP=0 "}
```

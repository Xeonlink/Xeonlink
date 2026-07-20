import homelabBackupImage from "@/assets/homelab_backup.png";
import homelabCaseImage from "@/assets/homelab_case.jpeg";
import homelabHubrackImage from "@/assets/homelab_hubrack.jpeg";
import homelabTailscaleImage from "@/assets/homelab_tailscale.png";
import netbirdImage from "@/assets/netbird.png";
import {
  ExternalLink,
  LinkIcon,
} from "@/features/resume/components/external-link";
import { ImageSwap } from "@/features/resume/components/image-swap";
import { Button } from "@/shared/components/ui/button";
import {
  SiDocker,
  SiOpnsense,
  SiProxmox,
  SiTailscale,
  SiTraefikproxy,
  SiWireguard,
} from "@icons-pack/react-simple-icons";
import { ArrowDownIcon, ArrowRightIcon, WifiIcon } from "lucide-react";
import { motion } from "motion/react";

export function HomeLabSection() {
  return (
    <section className="flex flex-col space-y-16 border-dotted py-16 not-last:border-b-2 md:px-8">
      <div className="flex items-center max-md:flex-col md:justify-center">
        <ImageSwap className="mb-2 h-32 rounded-2xl object-cover">
          <img
            className="h-32"
            src={homelabHubrackImage}
            alt="허브 랙에 PoE 스위치와 함께 장착 완료된 2U 서버"
            loading="lazy"
          />
          <img
            className="h-32"
            src={homelabCaseImage}
            alt="2U 랙마운트 케이스 내부에 메인보드, 파워, HDD와 SSD를 조립한 모습"
            loading="lazy"
          />
        </ImageSwap>
        <div className="mx-8">
          <span>2024.01 ~ running</span>
          <h2 className="text-4xl font-bold">
            Home<span className="text-accent">Lab</span>
          </h2>
          <p className="mt-2 break-keep">
            개인 서버를 운용하면서 서비스 배포, reverse proxy, VM과 container를
            이해하기 위해 공부. <br />
            특정 Cloud 벤더에 의존하는 것이 싫어서 On-Premise 환경을 구축
          </p>
        </div>
      </div>

      <div className="text-muted-foreground mx-auto grid grid-cols-1 gap-4 transition-all md:gap-8 lg:grid-cols-2">
        <div className="bg-muted space-y-6 rounded-2xl pt-8">
          <h3 className="px-8 text-2xl font-bold">네트워크 · 가상화 구성</h3>
          <div className="space-y-4 overflow-x-auto pb-8 text-center">
            <div className="flex min-w-132 flex-col items-center gap-2">
              <div className="bg-muted rounded-md border p-2">Internet</div>
              <ArrowDownIcon className="size-4" />
              <div className="rounded-md border border-blue-400 bg-blue-50 p-2 font-medium text-blue-600 dark:border-blue-300 dark:bg-blue-900/20 dark:text-blue-300">
                OPNsense{" "}
                <span className="text-muted-foreground block text-sm">
                  (방화벽 · 망 분리)
                </span>
              </div>
              <ArrowDownIcon className="size-4" />
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-muted flex w-40 items-center justify-center rounded-md border p-2">
                    DMZ (vmbr)
                  </div>
                  <ArrowDownIcon className="size-4" />
                  <div className="rounded-md border border-blue-400 bg-blue-50 p-2 font-medium text-blue-600 dark:border-blue-300 dark:bg-blue-900/20 dark:text-blue-300">
                    Traefik
                    <span className="text-muted-foreground block text-sm">
                      (reverse proxy)
                    </span>
                  </div>
                  <ArrowDownIcon className="size-4" />
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-md border p-2">
                      Docker compose
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-muted flex w-40 items-center justify-center rounded-md border p-2">
                    GUEST (vmbr)
                  </div>
                  <ArrowDownIcon className="size-4" />
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-muted rounded-md border p-2">
                        AP
                        <span className="text-muted-foreground block text-sm">
                          (access point)
                        </span>
                      </div>
                      <WifiIcon className="size-8 rotate-180" />
                    </div>
                    <div className="bg-muted h-16 rounded-md border p-2">
                      ...
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-muted flex w-40 items-center justify-center rounded-md border p-2">
                    LAN
                  </div>
                  <ArrowDownIcon className="size-4" />
                  <div className="rounded-md border border-blue-400 bg-blue-50 p-2 font-medium text-blue-600 dark:border-blue-300 dark:bg-blue-900/20 dark:text-blue-300">
                    Remote Device
                  </div>
                </div>
              </div>
              <span className="text-muted-foreground mt-2 text-sm">
                <span className="font-medium text-blue-600 dark:text-blue-300">
                  OPNsense
                </span>{" "}
                가 노출된 서비스와 내부망을 격리
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">Storage · Backup 전략</h3>
          <ul className="mb-0 flex flex-wrap items-center justify-center gap-4 py-4">
            <li>
              <div className="rounded-md border border-blue-600 p-4 text-blue-600 dark:border-blue-300 dark:text-blue-300">
                <ul className="flex gap-4">
                  <li className="flex min-w-32 rounded-md border p-4">
                    <p className="m-auto text-center">Data Drive</p>
                  </li>
                  <li className="flex min-w-32 rounded-md border p-4">
                    <p className="m-auto text-center">Data Drive</p>
                  </li>
                </ul>
              </div>
              <div className="mt-2 text-center">ZFS vDev (Mirror)</div>
            </li>
            <li className="flex min-w-32 rounded-md border p-4">
              <p className="m-auto text-center">
                Standby Drive <br />
                (block)
              </p>
            </li>
          </ul>
          <img
            className="mx-auto max-h-44 rounded-md border"
            src={homelabBackupImage}
            alt="Proxmox Backup Job Retention 구성"
          />
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              ZFS Mirror 를 사용 <ArrowRightIcon className="inline size-4" />{" "}
              Drive Failure 시 Standby Drive 로 vDev resilver
            </li>
            <li className="list-disc">
              매일 04:30 선택된 VM, LXC 백업 진행{" "}
              <ArrowRightIcon className="inline size-4" /> Mail 발송, Retention
              기간 동안 저장
            </li>
            <li className="list-disc">
              OPNsense <ArrowRightIcon className="inline size-4" /> 02:00-03:00
              에 자동 업데이트
            </li>
          </ul>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">Trouble Shooting</h3>
          <p>
            이전에는 OPNsense에{" "}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://www.wireguard.com/">
                  <SiWireguard />
                  WireGuard
                </ExternalLink>
              </Button>
            </motion.div>{" "}
            를 설정하여 사용했었으나, <br />
            ISP 에서 할당 받은 IP 주소가 변경되어 WireGuard Signal Server 에
            접근할 수 없어지는 문제가 발생
          </p>
          <img
            className="mx-auto max-h-44 rounded-md"
            src={homelabTailscaleImage}
            alt="OPNsense Tailscale 구성"
          />
          <p>
            어쩔 수 없이 Signal Server 만큼은{" "}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://tailscale.com/">
                  <SiTailscale />
                  Tailscale
                </ExternalLink>
              </Button>
            </motion.div>{" "}
            에 의존하는 것으로 타협
            <br />
            추후에{" "}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://tailscale.com/">
                  <img
                    className="-mx-0.5 size-4 grayscale"
                    src={netbirdImage}
                    alt="NetBird"
                  />
                  NetBird
                </ExternalLink>
              </Button>
            </motion.div>{" "}
            로 전환하여 Singal Server 까지 외부 의존을 배제하는 것이 목표
          </p>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="space-y-2">
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.proxmox.com/">
                    <SiProxmox />
                    Proxmox
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>VM과 컨테이너를 하나의 서버에서 관리하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://opnsense.org/">
                    <SiOpnsense />
                    OPNsense
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>방화벽 구성과 DMZ · GUEST 망 분리를 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://tailscale.com/">
                    <SiTailscale />
                    Tailscale
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>포트 개방 없이 외부에서 내부망에 접속하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://traefik.io/">
                    <SiTraefikproxy />
                    Traefik
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>서비스 노출과 도메인 연결을 자동화하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.docker.com/">
                    <SiDocker />
                    Docker
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>DMZ 영역의 서비스를 컨테이너로 운영하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://aws.amazon.com/route53/">
                    <LinkIcon className="size-4" />
                    Route 53
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>도메인 구매와 네임서버 운용을 위해 사용</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

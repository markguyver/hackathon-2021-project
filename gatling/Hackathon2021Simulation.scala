import scala.concurrent.duration._
import scala.util.Random

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Hackathon2021Simulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .acceptHeader("*/*")
    .contentTypeHeader("application/json")
    .userAgentHeader("insomnia/2021.5.3")

  val headers_0 = Map("Proxy-Connection" -> "Keep-Alive")

  val graphqlQueryPrefix = """{ "query" : "query { actionStarById (id: """
  val graphqlQuerySuffix = """) { id name dob } }" }"""

  val scn = scenario("Hackathon2021Simulation")
    .exec(
      http("request_0")
        .post("/graphql")
        .headers(headers_0)
        .body(
          StringBody(s"""$graphqlQueryPrefix ${(Random.nextInt(14) + 1)} $graphqlQuerySuffix""")
        )
    )

  setUp(scn.inject(atOnceUsers(1000))).protocols(httpProtocol)
}